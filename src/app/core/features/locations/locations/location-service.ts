import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { LocationListModel } from "./location.model";
import { API } from "../../../api-endpoints";
import { App } from "../../../../app";

export interface LocationResponse {
  data: LocationListModel[];
}

@Injectable({
    providedIn:'root',
})

export class LoctionService{
    private http = inject(HttpClient);
    getLocation(){
        return this.http.get<LocationResponse>(API.LOCATION+"?pageSize=9999");
    }

    onDelete(id: number){
        return this.http.delete(API.LOCATION+"/"+id);
    }
}