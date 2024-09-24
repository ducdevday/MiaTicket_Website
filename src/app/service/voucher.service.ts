import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../const/environment';
import CreateVoucherRequest from '../dto/request/create-voucher-request';
import CreateVoucherResponse from '../dto/response/create-voucher-response';
import UpdateVoucherRequest from '../dto/request/update-voucher-request';
import UpdateVoucherResponse from '../dto/response/update-voucher-response';
import DeleteVoucherResponse from '../dto/response/delete-voucher-response';
import GetMyVouchersResponse from '../dto/response/get-my-vouchers-response';
import GetVouchersDiscoveryResponse from '../dto/response/get-vouchers-discovery-response';
import SearchVoucherRequest from '../dto/request/search-voucher-request';
import SearchVoucherResponse from '../dto/response/search-voucher-response';

@Injectable({
  providedIn: 'root',
})
export class VoucherService {
  http!: HttpClient;
  private BASE_VOUCHER_URL = `${BASE_URL}/voucher`;
  private MY_VOUCHERS_URL = `my-vouchers`;
  private DISCOVERY_URL = `discovery`;
  private SEARCH_URL = `search`;

  constructor(http: HttpClient) {
    this.http = http;
  }

  createVoucher(createVoucherRequest: CreateVoucherRequest) {
    return this.http.post<CreateVoucherResponse>(
      `${this.BASE_VOUCHER_URL}`,
      createVoucherRequest
    );
  }

  updateVoucher(id: number, updateVoucherRequest: UpdateVoucherRequest) {
    return this.http.put<UpdateVoucherResponse>(
      `${this.BASE_VOUCHER_URL}/${id}`,
      updateVoucherRequest
    );
  }

  deleteVoucher(id: number) {
    return this.http.delete<DeleteVoucherResponse>(
      `${this.BASE_VOUCHER_URL}/${id}`
    );
  }

  getMyVouchers(eventId: number, keyword: string) {
    const params = new HttpParams({
      fromObject: { keyword },
    });
    return this.http.get<GetMyVouchersResponse>(
      `${this.BASE_VOUCHER_URL}/${this.MY_VOUCHERS_URL}/${eventId}`,
      { params }
    );
  }

  getVouchersDiscovery(eventId: number) {
    return this.http.get<GetVouchersDiscoveryResponse>(
      `${this.BASE_VOUCHER_URL}/${this.DISCOVERY_URL}/${eventId}`
    );
  }

  searchVoucher(searchVoucherRequest: SearchVoucherRequest) {
    const params = new HttpParams({
      fromObject: { ...searchVoucherRequest },
    });
    return this.http.get<SearchVoucherResponse>(
      `${this.BASE_VOUCHER_URL}/${this.SEARCH_URL}`,
      { params }
    );
  }
}
