import { NgModule } from '@angular/core';
import { OnInit, Component } from '@angular/core';
import { Produto } from './produto.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Component({
    selector: 'produto',
    templateUrl: './produto.component.html',
    styleUrls: ['./produto.component.css']
})

@NgModule({
    imports: [FormsModule, CommonModule],
    declarations: [ProdutoComponent]
})

export class ProdutoComponent implements OnInit {

    produto: Produto;
    produtosRef: AngularFireList<any>;
    produtos: any[];

    constructor(private db: AngularFireDatabase) { }

    ngOnInit(): void {
        this.produto = new Produto(null,null,null);
        this.listar();
    }

    salvar() {
        if (this.produto.key == null) {
            this.db.list('produtos').push(this.produto)
                .then((result: any) => {
                    console.log(result.key);
                });            
        } else {
            this.db.list('produtos').update(this.produto.key,this.produto)
            .then((result: any) => {
                console.log(result.key);
            });  
        }
    }

    carregar(produto:Produto) {
        this.produto = new Produto(produto.key,
            produto.nome, produto.preco);
    }

    excluir(key:string){
        if (confirm('Deseja realmente excluir ?')){
        this.db.list('produtos').remove(key)
            .then((result: any) => {
                console.log(result.key);
            });
            this.produto = new Produto(null, null, null);
        /*alert(key);*/
        }
    }

    listar() {
           
        this.getAll().subscribe(
            produtos => this.produtos = produtos,
            error => alert(error),
            () => console.log("terminou")
          );        
    }

    getAll() : Observable<any[]> {
        return this.db.list('produtos')
          .snapshotChanges()
          .pipe(
            map(changes => {
              return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
            })
          );
      }


}