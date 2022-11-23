import { trigger,state,animate,transition, style, animation } from "@angular/animations";
import { delay, timeout } from "rxjs";
export function flyInOut(){
    return trigger('flyInOut',[
        state('*',style({
            opacity:1,
            transform:"translateX(0)"
        })),
        transition(':enter',[
            style({
                transform:'translateX(-100%)',
                opacity:0
            }),
            animate('1000ms ease-in')
        ]),
        transition(':leave',[
            animate('1000ms ease-out',style({
                transform:'translateX(100%)',
                opacity:0
            }))
        ])
    ])
}
export function expand(){
    return trigger('expand',[
        state('*',style({
            opacity:1,
            transform:'translateY(0)'
        })),
        transition(':enter',[
            style({
                transform:'translateY(-100%)',
                opacity:0,
                
            }),
            animate('1000ms 1200ms')

        ])
    ])
}