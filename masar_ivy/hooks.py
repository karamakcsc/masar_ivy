app_name = "masar_ivy"
app_title = "MASAR IVY"
app_publisher = "KCSC"
app_description = "MASAR IVY"
app_email = "info@kcsc.com.jo"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/masar_ivy/css/masar_ivy.css"
# app_include_js = "/assets/masar_ivy/js/masar_ivy.js"

# include js, css files in header of web template
# web_include_css = "apps/masar_ivy/masar_ivy/public/css/housing_bank.css"
# web_include_js = "/assets/masar_ivy/js/masar_ivy.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "masar_ivy/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
#	"methods": "masar_ivy.utils.jinja_methods",
#	"filters": "masar_ivy.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "masar_ivy.install.before_install"
# after_install = "masar_ivy.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "masar_ivy.uninstall.before_uninstall"
# after_uninstall = "masar_ivy.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "masar_ivy.utils.before_app_install"
# after_app_install = "masar_ivy.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "masar_ivy.utils.before_app_uninstall"
# after_app_uninstall = "masar_ivy.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "masar_ivy.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
#	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
#	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
#	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
#	"*": {
#		"on_update": "method",
#		"on_cancel": "method",
#		"on_trash": "method"
#	}
# }
doctype_js = {
    "Payment Entry" : "custom/payment_entry/payment_entry.js",
    "Item" : "custom/item/item.js",
    "Sales Order" : "custom/sales_order/sales_order.js",
    "Sales Invoice" : "custom/sales_invoice/sales_invoice.js",
    "Customer" : "custom/customer/customer.js",
}

# Scheduled Tasks
# ---------------

# scheduler_events = {
#	"all": [
#		"masar_ivy.tasks.all"
#	],
#	"daily": [
#		"masar_ivy.tasks.daily"
#	],
#	"hourly": [
#		"masar_ivy.tasks.hourly"
#	],
#	"weekly": [
#		"masar_ivy.tasks.weekly"
#	],
#	"monthly": [
#		"masar_ivy.tasks.monthly"
#	],
# }

# Testing
# -------

# before_tests = "masar_ivy.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
#	"frappe.desk.doctype.event.event.get_events": "masar_ivy.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
#	"Task": "masar_ivy.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["masar_ivy.utils.before_request"]
# after_request = ["masar_ivy.utils.after_request"]

# Job Events
# ----------
# before_job = ["masar_ivy.utils.before_job"]
# after_job = ["masar_ivy.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
#	{
#		"doctype": "{doctype_1}",
#		"filter_by": "{filter_by}",
#		"redact_fields": ["{field_1}", "{field_2}"],
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_2}",
#		"filter_by": "{filter_by}",
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_3}",
#		"strict": False,
#	},
#	{
#		"doctype": "{doctype_4}"
#	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
#	"masar_ivy.auth.validate"
# ]
fixtures = [
    {"dt": "Custom Field", "filters": [
        [
            "name", "in", [
    			"Customer-custom_trade_name",
                "Item-custom_item_sub_group",
                "Item-custom_item_system",
                "Item-custom_item_type",
                "Customer-custom_customer_classification",
                "Item-custom_available_qty",
                "Sales Order-custom_party_type",
                "Sales Order-custom_supplier",
                "Sales Order-custom_supplier_name",
                "Sales Order-custom_employee",
                "Sales Order-custom_employee_name",
                "Sales Order-custom_lead",
                "Sales Order-custom_lead_name",
                "Supplier-custom_supplier_ar",
                "Payment Entry-custom_payment_voucher_no",
                "Payment Entry-custom_section_break_zst8o"

                  ]
        ]
    ]},
    {
        "doctype": "Property Setter",
        "filters": [
            [
                "name",
                "in",
                [
                    "Payment Entry-payment_type-options",
                    "Payment Entry-reference_date-mandatory_depends_on",
                    "Payment Entry-reference_no-mandatory_depends_on",
                    "Sales Order-order_type-options",
                    "Sales Order-customer-mandatory_depends_on",
                    "Sales Order-customer-depends_on",
                    "Sales Order-customer-reqd"
                ]
            ]
        ]
    }
]
