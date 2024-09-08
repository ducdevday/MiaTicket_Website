import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import GetListProvinceResponse from '../dto/response/get-list-province-response';
import { BASE_URL } from '../const/environment';
import GetListDistrictResponse from '../dto/response/get-list-district-response';
import GetListWardDataResponse from '../dto/response/get-list-ward-response';

@Injectable({
  providedIn: 'root',
})
export class VnAddressService {
  http!: HttpClient;
  private BASE_ADDRESS_URL = `${BASE_URL}/address`;
  private PROVINCE_URL = 'provinces';
  private DISTRICT_URL = 'districts';
  private WARD_URL = 'wards';
  constructor(http: HttpClient) {
    this.http = http;
  }
  getListProvince() {
    return this.http.get<GetListProvinceResponse>(
      `${this.BASE_ADDRESS_URL}/${this.PROVINCE_URL}`
    );
  }
  getListDistrict(province_id: string) {
    return this.http.get<GetListDistrictResponse>(
      `${this.BASE_ADDRESS_URL}/${this.DISTRICT_URL}/${province_id}`
    );
  }
  getListWard(district_id: string) {
    return this.http.get<GetListWardDataResponse>(
      `${this.BASE_ADDRESS_URL}/${this.WARD_URL}/${district_id}`
    );
  }
}
