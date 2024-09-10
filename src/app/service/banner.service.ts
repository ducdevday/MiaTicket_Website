import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../const/environment';
import GetBannersDiscoveryResponse from '../dto/response/get-banners-discovery-response';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  http!: HttpClient;
  private BASE_BANNER_URL = `${BASE_URL}/banner`;
  private DISCOVERY_URL = 'discovery';
  constructor(http: HttpClient) {
    this.http = http;
  }

  getBannersDiscovery() {
    return this.http.get<GetBannersDiscoveryResponse>(
      `${this.BASE_BANNER_URL}/${this.DISCOVERY_URL}`
    );
  }
}
