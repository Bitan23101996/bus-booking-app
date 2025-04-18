import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumbersOnly]'
})
export class NumbersOnlyDirective {

  constructor(private el: ElementRef) {}

  // Listen for the 'keypress' event and use 'key' to check the pressed key
  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent): boolean {
    const key = event.key;
    
    // Allow only digits (0-9) and prevent all others
    if (!/^[0-9]$/.test(key)) {
      event.preventDefault();
      return false;
    }
    
    return true;
  }

  // Handle paste events to ensure only numbers are pasted
  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();

    // Get the pasted data
    const pastedText = event.clipboardData?.getData('text') || '';
    
    // Filter out any non-numeric characters from the pasted text
    const numericText = pastedText.replace(/\D/g, '');
    
    // Set the input value to the numeric-only version
    const inputElement = this.el.nativeElement as HTMLInputElement;
    inputElement.value = numericText;
  }
}


