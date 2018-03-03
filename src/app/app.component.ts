import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})

export class AppComponent {
    product = {
        'date': 0,
        'name': '',
        'des': '',
        'pr': ''
    };
    products = (localStorage.getItem('table')) ? JSON.parse(localStorage.getItem('table')) : [];
    flagName;
    flagDescription;
    flagPrice;
    flagEdit;

    addProduct() {
        this.flagName = ((<HTMLInputElement>document.getElementById('Name')).value) ? false : true;
        this.flagDescription = ((<HTMLInputElement>document.getElementById('Description')).value) ? false : true;
        this.flagPrice = ((<HTMLInputElement>document.getElementById('Price')).value) ? false : true;
        if (!this.flagName && !this.flagDescription && !this.flagPrice) {
            if (this.product.date === 0) {
                this.products.push({
                    name: this.product.name,
                    des: this.product.des,
                    pr: this.product.pr,
                    date: new Date()
                });
            }
            console.log('aaa');
            this.product = {
                'date': 0,
                'name': '',
                'des': '',
                'pr': ''
            };
            this.flagEdit = false;
        }

        localStorage.setItem('table', JSON.stringify(this.products));
    }

    editProduct(obg) {
        if (!this.flagEdit) {
            this.flagName = this.flagDescription = this.flagPrice = false;
            this.product = obg;
            this.flagEdit = true;
        }
    }

    deleteProduct(obg) {
        if (!this.flagEdit) {
            for (let i = 0; i < this.products.length; i++) {
                if (obg.id === this.products[i].id) {
                    this.products.splice(i, 1);
                    localStorage.setItem('table', JSON.stringify(this.products));
                    break;
                }
            }
        }
    }

}
