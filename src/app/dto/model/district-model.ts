export default class DistrictModel {
  district_id!: string;
  district_name!: string;
  district_type!: string;
  province_id!: string;

  constructor(data: Partial<DistrictModel> = {}) {
    Object.assign(this, data);
  }
}
