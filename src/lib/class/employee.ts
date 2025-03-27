type personalInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dob: string | Date;
  gender: string;
  departmentId: string;
  roleId: string;
};

type addressInfo = {
  country: string;
  state: string;
  district: string;
  city: string;
  street: string;
  postalCode: string;
};

export class Employee {
  private personalInfo: personalInfo = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dob: "",
    gender: "",
    departmentId: "",
    roleId: "",
  };
  private addressInfo: addressInfo = {
    country: "",
    state: "",
    district: "",
    city: "",
    street: "",
    postalCode: "",
  };

  setPersonalInfo(personalInfo: personalInfo) {
    this.personalInfo = personalInfo;
  }

  setAddressInfo(addressInfo: addressInfo) {
    this.addressInfo = addressInfo;
  }

  getPersonalInfo() {
    return this.personalInfo;
  }

  getAddressInfo() {
    return this.addressInfo;
  }

  getEmployeeData() {
    return { ...this.personalInfo, address: this.addressInfo };
  }
}
