import { NgModule } from '@angular/core';
import { OnInit, Component } from '@angular/core';
import { Carros } from './carros.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Component({
    selector: 'carros',
    templateUrl: './carros.component.html',
    styleUrls: ['./carros.component.css']
})

@NgModule({
    imports: [FormsModule, CommonModule],
    declarations: [CarrosComponent]
})

export class CarrosComponent implements OnInit {

    carros: Carros;
    carrossRef: AngularFireList<any>;
    carross: any[];

    constructor(private db: AngularFireDatabase) { }

    ngOnInit(): void {
        this.carros = new Carros(null,null,null);
        this.listar();
    }
  /*
    salvar() {
        if (this.carros.key == null) {
            this.db.list('carross').push(this.carros)
                .then((result: any) => {
                    console.log(result.key);
                });            
        } else {
            this.db.list('carross').update(this.carros.key,this.carros)
            .then((result: any) => {
                console.log(result.key);
            });  
        }
    }
  /*/
    carregar(carros:Carros) {
        this.carros = new Carros(carros.key,
            carros.nome, carros.dataFabricacao);
    }

    excluir(key:string) {
        if (confirm('Deseja realmente excluir?')){            
            this.db.list('carross').remove(key)
            .then((result: any) => {
                console.log(key);
            }); 
        }
    }

    listar() {        
        this.getAll().subscribe(
            carross => this.carross = carross,
            error => alert(error),
            () => console.log("terminou")
          );        
    }

    getAll() : Observable<any[]> {
        return this.db.list('carross')
          .snapshotChanges()
          .pipe(
            map(changes => {
              return changes.map(c => (
                  { key: c.payload.key, ...c.payload.val() }));
            })
          );
      }


}