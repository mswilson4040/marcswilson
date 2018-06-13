import * as fs from 'fs-extra';
import * as download from 'download-git-repo';
import * as MongoClient from 'mongodb/lib/mongo_client';
import { environment } from '../environments/environment';
import * as csv from 'csvtojson';

export class MlbStatsDb {
    constructor(){
        this.init();
    }
    async init(): Promise<void> {
        let errorOccurred = false;

        console.log(`Step 1/12: Removing BaseballDatabank local repo`);
        const removeDBStep = await this.removeDatabankRepo();
        errorOccurred = removeDBStep === true ? false : removeDBStep;
        if (errorOccurred) {
            console.log(`Error removing databank repo`);
        } else {
            console.log(`Step 1/12: Finished removing BaseballDatabank local repo`)
        }

        console.log(`Step 2/12: Cloning baseball databank repo`);
        try {
            console.log(`Step 2/12: About to clone repo`);
            const cloneRepoStep = await this.cloneRepository();
            console.log(`Step 2/12: done cloning baseball databank repo`);
            errorOccurred = cloneRepoStep === true ? false : cloneRepoStep;
            if ( errorOccurred ) {
                console.log( `Step 2/12: Failed - Error cloning baseball databank`);
            } else {
                console.log(`Step 2/12: Finished cloning baseball databank`);
            }
        } catch(ex) {
            console.log(ex.message);
        }

        console.log(`Step 3/12: Dropping mlbstatsdb`);
        const dropDBStep = await this.dropDatabase();
        errorOccurred = dropDBStep === true ? false : dropDBStep;
        if (errorOccurred) {
            console.log(`Step 3/12: Failed - Error droping mlbstatsdb`);
        } else {
            console.log(`Step 3/12: mlbstatsdb has been dropped`);
        }

        console.log(`Step 4/12: Creating database`);
        const createDBStep = await this.createDatabase();
        console.log(`after createdbstep ${createDBStep}`);
        errorOccurred = createDBStep === true ? false : createDBStep;
        if (errorOccurred) {
            console.log(`Step 4/12: Failed - Error creating database`);
        } else {
        }
    }
    async removeDatabankRepo(): Promise<any> {
        console.log('removeDatabankRepo entered' );
        return new Promise( (resolve, reject) => {
            console.log('About to Remove baseballdatabank' );
            fs.remove('baseballdatabank', err => {
                console.log('fs remove finished');
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        });
    }
    async cloneRepository(): Promise<any> {
        return new Promise( (resolve, reject) => {
            this.removeDatabankRepo().then( res => {
                if (res) {
                    try {
                        download('chadwickbureau/baseballdatabank', 'baseballdatabank', (err) => {
                            if (!err) {
                                resolve(true);
                            } else {
                                reject(err);
                            }
                        });
                    } catch (ex) {
                        reject(ex);
                    }
                } else {
                    reject(null);
                }
            });
        });
    }
    async dropDatabase(): Promise<any> {
        return new Promise( (resolve, reject) => {
            MongoClient.connect(`${environment.DATABASE.CONNECTION_STRING}/chadwickdb`, (err, _db) => {
                if (err) {
                    reject(err);
                } else {
                    _db.dropDatabase({}, (dropErr, result) => {
                        if (dropErr) {
                            reject(dropErr);
                            _db.close();
                        } else {
                            resolve(true);
                            _db.close();
                        }
                    });
                }
            })
        });
    }
    async createDatabase(): Promise<any> {
        return new Promise( (resolve, reject) => {
            this.getCsvFiles().then( files => {
                const testFiles = files.splice(0, 5);
                const promises = files.map( async f => {
                    const name = this.getCollectionNameFromFile(f);
                    if (name) {
                        return this.createCollection( name, f );
                    }
                });
                Promise.all(promises).then( results => {
                    console.log(`All promises completed: ${results.length}`);
                    resolve(true);
                }, error => {
                }).catch( error => {
                    reject(error);
                });
            }, error => {
                reject( error );
            });
        });
    }
    async createCollection(collectionName: string, fileName: string): Promise<any> {
        return new Promise( (resolve, reject) => {
            MongoClient.connect(`${environment.DATABASE.CONNECTION_STRING}/chadwickdb`, (err, db) => {
                if (!err) {
                    const data = [];
                    console.log(`creating ${collectionName} collection`);
                    db.createCollection(collectionName, (colError, result) => {
                        if (!colError) {
                            // TODO: CSV to JSON here...
                            const csvPath = `baseballdatabank/core/${fileName}`;
                            console.log('csvpath', csvPath);
                            csv().fromFile(csvPath).on('json', (jsonObj) => {
                                if (jsonObj) {
                                    console.log(jsonObj);
                                    data.push(jsonObj);
                                } else {
                                    console.error('REJECTED');
                                    reject(true);
                                }
                            }).on('done', error => {
                                console.log(`csv process complete for ${collectionName}. record count: ${data.length}`);
                                if (error) {
                                    console.log(`Something bad happened!!!!!`);
                                    reject(error);
                                    db.close();
                                } else {
                                    const collection = db.collection(collectionName);
                                    const batch = collection.initializeOrderedBulkOp();
                                    for (let i = 0; i < data.length; i++) {
                                        batch.insert(data[i]);
                                    }
                                    console.log(`batch command about to execute ${collectionName}`);
                                    batch.execute( (bulkError, bulkResult) => {
                                        if (bulkError) {
                                            console.log(`Bulk Error!`);
                                            db.close();
                                            reject(bulkError);
                                        } else {
                                            console.log(`Bulk process done for ${collectionName}`);
                                            db.close();
                                            resolve(bulkResult);
                                        }
                                    });
                                }
                            });
                        } else {
                            reject(colError);
                            db.close();
                        }
                    });
                } else {
                    reject(err);
                }
            });
        });
    }
    getCollectionNameFromFile(fileName: string): string {
        let name = '';
        if (fileName.endsWith('.csv')) {
            fileName = fileName.replace('.csv', '');
            //name = fileName.endsWith('s') ? fileName.toLowerCase() : `${fileName.toLowerCase()}s`;
            //return name;
            return fileName.toLowerCase();
        }
        return null;
    }
    getCsvFiles(): Promise<any> {
        const files = [];
        return new Promise( (resolve, reject) => {
            fs.readdir('baseballdatabank/core', (err, _files) => {
                if (!err) {
                    for (let i = 0; i < _files.length; i++) {
                        if (_files[i].endsWith('.csv')) {
                            files.push( _files[ i ] );
                        }
                    }
                    resolve(files);
                } else {
                    reject(err);
                }
            })
        });
    }
}

new MlbStatsDb();