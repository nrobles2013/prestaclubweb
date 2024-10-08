import { Component, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
  UntypedFormArray,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { order, InvoiceList } from '../invoice';
import { InvoiceService } from '../invoice.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-invoice',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css'],
  providers: [InvoiceService]
})
export class AddInvoiceComponent implements OnInit {

  addForm: any;
  rows: UntypedFormArray;
  invoice: InvoiceList = new InvoiceList();

  ///////////////////////////////////////////////////////////
  subTotal = 0;
  vat = 0;
  grandTotal = 0;

  constructor(
    private fb: UntypedFormBuilder,
    private invoiceService: InvoiceService,
    private router: Router
  ) {
    this.invoice.id =
      Math.max.apply(
        Math,
        this.invoiceService.getInvoiceList().map(function (o) {
          return o.id;
        })
      ) + 1;
    this.invoice.status = 'Pending';

    ///////////////////////////////////////////////////////////

    this.addForm = this.fb.group({});

    this.rows = this.fb.array([]);
    this.addForm.addControl('rows', this.rows);
    this.rows.push(this.createItemFormGroup());
  }

  ngOnInit(): void {}

  ////////////////////////////////////////////////////////////////////////////////////
  onAddRow() {
    this.rows.push(this.createItemFormGroup());
  }

  onRemoveRow(rowIndex: number) {
    let totalCostOfItem =
      this.addForm.get('rows')?.value[rowIndex].unitPrice *
      this.addForm.get('rows')?.value[rowIndex].units;

    this.subTotal = this.subTotal - totalCostOfItem;
    this.vat = this.subTotal / 10;
    this.grandTotal = this.subTotal + this.vat;

    this.rows.removeAt(rowIndex);
  }

  createItemFormGroup(): UntypedFormGroup {
    return this.fb.group({
      itemName: ['', Validators.required],
      units: ['', Validators.required],
      unitPrice: ['', Validators.required],
      itemTotal: ['0'],
    });
  }

  itemsChanged() {
    let total: number = 0;

    for (
      let t = 0;
      t < (<UntypedFormArray>this.addForm.get('rows')).length;
      t++
    ) {
      if (
        this.addForm.get('rows')?.value[t].unitPrice != '' &&
        this.addForm.get('rows')?.value[t].units
      ) {
        total =
          this.addForm.get('rows')?.value[t].unitPrice *
            this.addForm.get('rows')?.value[t].units +
          total;
      }
    }
    this.subTotal = total;
    this.vat = this.subTotal / 10;
    this.grandTotal = this.subTotal + this.vat;
  }

  ////////////////////////////////////////////////////////////////////

  saveDetail() {
    this.invoice.grandTotal = this.grandTotal;
    this.invoice.totalCost = this.subTotal;
    this.invoice.vat = this.vat;

    for (
      let t = 0;
      t < (<UntypedFormArray>this.addForm.get('rows')).length;
      t++
    ) {
      let o: order = new order();

      o.itemName = this.addForm.get('rows')?.value[t].itemName;
      o.unitPrice = this.addForm.get('rows')?.value[t].unitPrice;
      o.units = this.addForm.get('rows')?.value[t].units;
      o.unitTotalPrice = o.units * o.unitPrice;

      this.invoice.orders.push(o);
    }
    this.invoiceService.addInvoice(this.invoice);
    alert('New Invoice Added !!');
    this.router.navigate(['/apps/invoice']);
  }
}
