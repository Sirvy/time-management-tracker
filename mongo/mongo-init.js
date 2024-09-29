db.auth('mongoroot', 'mongorootpassword');

db = db.getSiblingDB('timelance')

db.createUser({
	user: "mongouser",
	pwd: "monNGdbpassw00rd",
	roles: [{role: "userAdminAnyDatabase", db: "timelance"}]
});

