export default class WardModel {
  ward_id!: string;
  ward_name!: string;
  ward_type!: string;
  district_id!: string;

  constructor(data: Partial<WardModel> = {}) {
    Object.assign(this, data);
  }
}
