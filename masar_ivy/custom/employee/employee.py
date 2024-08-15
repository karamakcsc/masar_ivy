import frappe
def validate(self , method):
    add_ss_value(self)

def add_ss_value(self):
    if float(self.custom_additional_social_security_salary) != 0:
        contribution = float(self.custom_additional_social_security_salary)
    else:
        contribution = float(self.custom_social_security_salary)

    comp_doc = frappe.get_doc('Company' , self.company)
    emp_comp_rate = comp_doc.custom_employee_share_rate

    if self.custom_employee_share_rate not in [0 , None]:
        rate = float(self.custom_employee_share_rate) / 100
    else:
        rate = float(emp_comp_rate) / 100
    if contribution in [None , 0]:
        frappe.throw("Add one of Social Security Salary or Additional Social Security Salary")
    self.custom_ss_component = contribution
    self.social_security_amount = contribution * rate