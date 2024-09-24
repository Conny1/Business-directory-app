export type CategoryType = {
  name: string;
  imageurl: string;
};

export type businessType = {
  id?: string;
  name: string;
  imgurl: string;
  address: string;
  rating: number;
  category: string;
  about: string;
  contact: string;
  website: string;
  userid?:string
};

export type Comment = {
  comment: string;
  businessid: string;
  user:string
  id?:string
};

