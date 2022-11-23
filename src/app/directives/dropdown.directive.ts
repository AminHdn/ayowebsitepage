import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  constructor( private el:ElementRef,
    private render:Renderer2) { }

@HostListener('mouseenter')onmouseEnter(){
  this.render.addClass(this.el.nativeElement,'dropdown')
}
@HostListener('mouseleave')onmouseLeave(){
  this.render.removeClass(this.el.nativeElement,'dropdown')
}

}
