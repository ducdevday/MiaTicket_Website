import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../const/environment';
import GetCategoriesDiscoveryResponse from '../dto/response/get-categories-discovery-response';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  http!: HttpClient;
  private BASE_CATEGORY_URL = `${BASE_URL}/category`;
  private DISCOVERY_URL = 'discovery';
  constructor(http: HttpClient) {
    this.http = http;
  }

  getCategoriesDiscovery() {
    return this.http.get<GetCategoriesDiscoveryResponse>(
      `${this.BASE_CATEGORY_URL}/${this.DISCOVERY_URL}`
    );
  }
}
