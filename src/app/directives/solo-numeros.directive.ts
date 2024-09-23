import { Directive, ElementRef, HostListener, Input } from "@angular/core";
import { NgModel } from "@angular/forms";

 

@Directive({
  standalone: true,
  selector: '[appSoloNumeros]',
})
export class SoloNumerosDirective {
  @Input() allowDots: boolean = false;

  constructor(
    private readonly elRef: ElementRef,
    private readonly ngModel: NgModel
  ) { }

  @HostListener('input', ['$event'])
  onChangeInput(event: Event):void {
    const input = this.elRef.nativeElement as HTMLInputElement;
    const oldValue = input.value;

    // Determine the regex based on the allowDots flag
    const regex = this.allowDots ? /[^0-9.]/g : /[^0-9]/g;

    // Remove characters that don't match the regex
    let newValue = oldValue.replace(regex, '');

    // If allowDots is true, ensure only one period is allowed
    if (this.allowDots) {
      const parts = newValue.split('.');
      if (parts.length > 2) {
        newValue = parts[0] + '.' + parts.slice(1).join('');
      }
    }

    // Update the input field value
    if (oldValue !== newValue) {
      input.value = newValue;
      // Trigger a change event
      this.ngModel.control?.setValue(newValue, { emitEvent: false });
    }
  }

}
