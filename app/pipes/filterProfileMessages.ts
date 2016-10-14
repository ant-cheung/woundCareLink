import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {Message} from '../pages/models/message';

@Pipe({
    name: 'filterProfileMessages'
})
// This is a pipe used for filtering messages displayed on a user profile: Only show top level messages: those without parentMessageId set, 
export class FilterProfileMessagesPipe {
    transform(items: Message[], args: any[]): any {
        // filter items array, items which match and return true will be kept, false will be filtered out
        return items.filter(item => item.parentMessageId === null);
    }
}