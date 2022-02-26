import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { WorkerModel } from '../models/worker.model';
@Injectable({
  providedIn: 'root'
})
export class WorkersService {
  collectionName = 'workers';

  constructor(private db: AngularFirestore) { }

  getWorkers(): Observable<WorkerModel[]>{
    return this.db.collection(this.collectionName)
    .snapshotChanges()
    .pipe(
      map((data: DocumentChangeAction<any>[]) => {
        const ret: WorkerModel[] = [];
        for (const workerDoc of data) {

          const worker: WorkerModel = {
            ...workerDoc.payload.doc.data(),
            id: workerDoc.payload.doc.id
          };

          ret.push(worker);
        }
        console.log(ret);

        return ret;
      }

      )
    )
  }




}
