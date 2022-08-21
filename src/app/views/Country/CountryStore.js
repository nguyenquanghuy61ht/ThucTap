import {
  pagingCountries,
  createCountry,
  editCountry,
  deleteCountry,
  getCountry,
} from "./CountryService";
import { makeAutoObservable,  autorun } from "mobx";

class CountryStore {
  countryList = [];
  totalPage = 0;
  status = "initial";
  constructor() {
    makeAutoObservable(this);
    autorun(() => console.log("run each state change", this.status));
  }
  async Create(obj) {
    try {
      let response = await createCountry(obj);
      if (response.status === 201) {
        this.status = "success";
      }
    } catch (error) {
      this.status = "error";
    }
  }
  async Update(obj) {
    try {
      await editCountry(obj);
    } catch (error) {
      console.error(`error:${error}`);
    }
  }
  async Delete(id) {
    try {
      await deleteCountry(id);
    } catch (error) {
      console.error(`error:${error}`);
    }
  }
  async Get(id) {
    try {
      const value = await getCountry(id);
      return value;
    } catch (error) {
      console.error(`error:${error}`);
    }
  }

  async getData(searchByPage) {
    try {
      let data = await pagingCountries(searchByPage);
      this.countryList = data.data.content;
      this.totalPage = data.data.totalPages;
      return data;
    } catch (error) {
      this.status = "error";
    }
  }
}

export default CountryStore;
