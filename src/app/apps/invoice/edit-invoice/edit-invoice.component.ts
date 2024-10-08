import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../invoice.service';
import { InvoiceList, order } from '../invoice';
import {
  UntypedFormGroup,
  UntypedFormArray,
  UntypedFormBuilder,
  Validators,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-invoice',
  standalone: true,
  imports:[FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.css'],
  providers: [InvoiceService]
})
export class EditInvoiceComponent implements OnInit {
  id: any;
  invoice: InvoiceList;

  addForm: any;

  subTotal = 0;
  vat = 0;
  grandTotal = 0;

  constructor(
    activatedRouter: ActivatedRoute,
    private invoiceService: InvoiceService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.id = activatedRouter.snapshot.paramMap.get('id');
    this.invoice = this.invoiceService
      .getInvoiceList()
      .filter((x) => x.id === +this.id)[0];

    this.subTotal = this.invoice.totalCost;
    this.vat = this.invoice.vat;
    this.grandTotal = this.invoice.grandTotal;

    this.addForm = this.fb.group({
      item: this.fb.array([this.itemControl()]),
    });

    this.fillAddControls();
  }

  ngOnInit(): void {}

  itemControl(): UntypedFormGroup {
    return this.fb.group({
      itemName: ['', Validators.required],
      itemCost: ['', Validators.required],
      itemSold: ['', Validators.required],
      itemTotal: ['0'],
    });
  }

  fillAddControls() {
    this.addForm.setControl('item', this.setItem(this.invoice.orders));
  }

  setItem(order: any): UntypedFormArray {
    const fa = new UntypedFormArray([]);
    order.forEach((s: any) => {
      fa.push(
        this.fb.group({
          itemName: s.itemName,
          itemCost: s.unitPrice,
          itemSold: s.units,
          itemTotal: s.unitTotalPrice,
        })
      );
    });
    return fa;
  }

  btnAddItemClick(): void {
    (<UntypedFormArray>this.addForm.get('item')).push(this.itemControl());
  }

  btnRemoveClick(i: number): void {
    let totalCostOfItem =
      this.addForm.get('item')?.value[i].itemCost *
      this.addForm.get('item')?.value[i].itemSold;

    this.subTotal = this.subTotal - totalCostOfItem;
    this.vat = this.subTotal / 10;
    this.grandTotal = this.subTotal + this.vat;

    (<UntypedFormArray>this.addForm.get('item')).removeAt(i);
  }

  //////////////////////////////////////////////////////////////////////////////

  itemsChanged() {
    let total: number = 0;

    for (
      let t = 0;
      t < (<UntypedFormArray>this.addForm.get('item')).length;
      t++
    ) {
      if (
        this.addForm.get('item')?.value[t].itemCost != '' &&
        this.addForm.get('item')?.value[t].itemSold
      ) {
        total =
          this.addForm.get('item')?.value[t].itemCost *
            this.addForm.get('item')?.value[t].itemSold +
          total;
      }
    }
    this.subTotal = total;
    this.vat = this.subTotal / 10;
    this.grandTotal = this.subTotal + this.vat;
  }

  saveDetail() {
    this.invoice.grandTotal = this.grandTotal;
    this.invoice.totalCost = this.subTotal;
    this.invoice.vat = this.vat;

    this.invoice.orders = [];

    for (
      let t = 0;
      t < (<UntypedFormArray>this.addForm.get('item')).length;
      t++
    ) {
      let o: order = new order();
      o.itemName = this.addForm.get('item')?.value[t].itemName;
      o.unitPrice = this.addForm.get('item')?.value[t].itemCost;
      o.units = this.addForm.get('item')?.value[t].itemSold;
      o.unitTotalPrice = o.units * o.unitPrice;
      this.invoice.orders.push(o);
    }

    this.invoiceService.updateInvoice(this.invoice.id, this.invoice);
    alert('Invoice Updated !!');
    this.router.navigate(['/apps/invoice']);
  }
}
