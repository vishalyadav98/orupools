import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filtername: string): any {
    if(!value) return [];
 if(!filtername) return value;
    console.log(filtername);
    console.log(value);

  
  return value.filter( (it:any) => {
    console.log(it);
  let id =  it.uniqueId.includes(filtername);
 /*  let name =  it.name.includes(filtername); */
  if(id){
    return id;
  }
  else{
    let pname =  it.name.includes(filtername);
    return pname;
  }
   });

   
  }

}
