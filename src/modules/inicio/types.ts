export interface Item {
  base: string;
  date: string;
  rates: {USD:number, MXN: number, EUR: number};
  success: boolean;
  error: {info: string};
}

export interface InicioMdStt {
  error: any;
  loading: boolean;
  toFind: boolean;
  item: Item | undefined;
  categories: Array<Category> | undefined;
  messageSubmitted: boolean;
  messages: Array<Message> | undefined;
}

export interface Category {
  category_code: number;
  category_name?: String;
}

export interface UserPortal {
  user_code: number;
  user_name: String | undefined;
}

export interface Message {
  message_code?: number;
  category: Category;
  message: String;
  userPortal: UserPortal;
}
