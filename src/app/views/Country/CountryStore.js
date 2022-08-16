import { pagingCountries,createCountry,editCountry,deleteCountry,getCountry } from "./CountryService";
import { makeAutoObservable, runInAction, autorun } from "mobx";

class CountryStore {
  countryList = [];
  totalPage = 0;
  status = "initial";
  constructor() {
    makeAutoObservable(this);
      autorun(() =>
        console.log("run each state change", this.countryList.slice(),this.status.slice())
        
      );

  }
  async Create(obj) {
    try {
      let response = await createCountry(obj);
      if (response.status === 201) {
        runInAction(() => {
          this.status = "success";
        });
      }
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
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

  async getData(searchByPage) {
    try {
      let data = await pagingCountries(searchByPage);
      runInAction(() => {
        this.countryList = data.data.content;
        this.totalPage = data.data.totalPages;
      });
    } catch (error) {
      console.error(`error:${error}`);
    }
  }
}

export default CountryStore;
