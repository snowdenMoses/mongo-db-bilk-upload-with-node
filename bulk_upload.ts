public async createMultipleEmployee(EmployeeData: any): Promise < any > {
    if(isEmpty(EmployeeData)) throw new HttpException(400, "You're not EmployeeData");

const formatted = EmployeeData.map((e: any) => ({
    ...e,
    status: 'active',
    first_name: e.first_name,
    middle_name: e.middle_name,
    last_name: e.last_name,
    isAdmin: e.isAdmin === 'true' ? true : false,
    leaveCount: 0,
    department: this.notEmpty(e.department) ? e?.department : null,
    designation: this.notEmpty(e.designation) ? e?.designation : null,
    projectId: null,
    company_email: e.company_email,
    default_shift: null,
    reports_to: null,
    branch: null,
    gender: e.gender.toLowerCase(),
    ogid: e.ogid.toUpperCase(),
    employeeType: e.employeeType,
    date_of_joining: new Date()
}));
const employeesRecord = [];
for (let idx = 0; idx < formatted.length; idx++) {
    const record = formatted[idx]
    const employeeInfo = await this.Employees.findOne({ company_email: record.company_email })
    if (!employeeInfo) {
        employeesRecord.push(record)
    }
}
const createEmployeeData = await this.Employees.insertMany(employeesRecord);
return createEmployeeData;
  }