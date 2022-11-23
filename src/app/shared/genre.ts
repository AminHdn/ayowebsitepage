export interface GENRE{
    Comedic:string,
    Drama:string,
    Musical:string,
    Thriller:string,
    Action:string,
    Romance:string,
    Melodrama:string,
    Mystery:string,
    SciFi:string,
    Fantasy:string,
    Horror:string,
    Western:string,
    Noir :string,
    Adventure:string,

}

export interface GEN{
  genre:string;
} 

export const gen:GEN[]=[
  {genre:'ژانر کمدی'},
  {  genre:'ژانر درام'},
  {genre:'ژانر موزیکال'},
  {genre:'ژانر تریلر'},
  {genre:'ژانر اکشن'},
  {genre:'ژانر عاشقانه'},
 { genre:'ژانر ملودرام'},
  {genre:'ژانر معمایی'},
 {genre:'ژانر علمی-تخیلی '},
 {genre:'ژانر فانتزی '},
 { genre :'ژانر ترسناک'},
  {genre :'ژانر وسترن'},
  {genre :'ژانر نوآر'},
  {genre :'ژانر ماجراجویی'}
]



export const genres:GENRE={
    Comedic:'ژانر کمدی',
    Drama:'ژانر درام',
  Musical:'ژانر موزیکال',
  Thriller:'ژانر تریلر',
  Action:'ژانر اکشن',
  Romance:'ژانر عاشقانه',
  Melodrama:'ژانر ملودرام',
  Mystery:'ژانر معمایی',
 SciFi:'ژانر علمی-تخیلی ',
 Fantasy:'ژانر فانتزی ',
  Horror :'ژانر ترسناک',
  Western :'ژانر وسترن',
  Noir :'ژانر نوآر',
  Adventure :'ژانر ماجراجویی'
}