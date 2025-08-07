from flask import Flask, jsonify
from flask_cors import CORS
from models import db, ProviderInfo, ProviderConfig
from flask import request
import config

# Initialize Flask app
app = Flask(__name__) 
app.config.from_object(config)

# Enable CORS
CORS(app)

# Initialize DB
db.init_app(app)

# Create tables if not already present
with app.app_context():
    db.create_all()

##########################
# ✅ Health Check Route
##########################
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Healthcare Provider API is running ✅"}), 200

##########################
# ✅ Get First 10 Providers Route
##########################
@app.route("/api/providers", methods=["GET"])
def get_first_10_providers():
    providers = ProviderInfo.query.limit(100).all()  # LIMIT to 10 records
    result = []

    for p in providers:
        address = p.addresses[0] if p.addresses else None
        contact = p.communications[0] if p.communications else None
        specialty = p.specialities[0] if p.specialities else None
        certification = p.certifications[0] if p.certifications else None
        insurance = p.insurances[0] if p.insurances else None
        affiliation = p.affiliations[0] if p.affiliations else None
        visit_mode = p.visit_modes[0] if p.visit_modes else None
        languages = list(set(lang for lang_obj in p.languages for lang in (lang_obj.ProviderLanguage or [])))
        rating = sum([r.RatingValue for r in p.ratings]) / len(p.ratings) if p.ratings else None

        result.append({
            "id": p.ProviderID,
            "profileImage": p.ProviderImage,
            "firstName": p.ProviderFirstName,
            "middleInitial": p.ProviderMiddleInitial,
            "lastName": p.ProviderLastName,
            "degree": certification.ProviderDegree if certification else "",
            "type": p.ProviderType,
            "specialtyName": specialty.ProviderSpecialityName if specialty else "",
            "addressLine1": address.ProviderAddressLine1 if address else "",
            "addressLine2": address.ProviderAddressLine2 if address else "",
            "city": address.ProviderCity if address else "",
            "state": address.ProviderState if address else "",
            "county": address.ProviderCounty if address else "",
            "country": address.ProviderCountry if address else "",
            "zipCode": address.ProviderZIPCode if address else "",
            "latitude": float(address.ProviderLatitude) if address and address.ProviderLatitude else None,
            "longitude": float(address.ProviderLongitude) if address and address.ProviderLongitude else None,
            "phoneNumber": contact.ProviderPhoneNo if contact else "",
            "emailId": contact.ProviderEmail if contact else "",
            "yearOfExperience": certification.ProviderYearsOfExperience if certification else 0,
            "acceptingNewPatients": visit_mode.Acceptingnewpatients == 'Yes' if visit_mode else False,
            "rating": float(rating) if rating else None,
            "planName": insurance.ProviderPlanName[0] if insurance and insurance.ProviderPlanName else "",
            "acceptedAllPlans": insurance.ProviderPlanName if insurance and insurance.ProviderPlanName else [],
            "affiliationName": affiliation.ProviderAffiliationName if affiliation else "",
            "boardName": certification.ProviderBoardName if certification else "",
            "boardCertified": certification.ProviderBoardCertified == 'Yes' if certification else False,
            "workingHours": "Mon-Fri: 8:00 AM - 5:00 PM",  # Optional: set dynamically later
            "race": p.ProviderRaceEthnicity,
            "gender": p.ProviderGender,
            "languagesSpoken": languages,
            "npiId": p.ProviderNPI,
            "virtualCareAvailable": visit_mode.VirtualCare == 'Yes' if visit_mode else False,
            "hospitalAffiliations": True if affiliation else False
        })

    return jsonify(result), 200

##########################
# ✅ Get Provider by ID Route
##########################
@app.route("/api/providers/<string:provider_id>", methods=["GET"])
def get_provider_by_id(provider_id):
    provider = ProviderInfo.query.get(provider_id)
    if not provider:
        return jsonify({"error": "Provider not found"}), 404

    return jsonify({
        "ProviderID": provider.ProviderID,
        "firstName": provider.ProviderFirstName,
        "middleInitial": provider.ProviderMiddleInitial,
        "lastName": provider.ProviderLastName,
        "gender": provider.ProviderGender,
        "age": provider.ProviderAge,
        "npi": provider.ProviderNPI,
        "type": provider.ProviderType,
        "raceEthnicity": provider.ProviderRaceEthnicity,
        "dob": provider.ProviderDOB.isoformat() if provider.ProviderDOB else None,
    }), 200
######################
# ✅ Brand & Logo Config
######################
@app.route("/config", methods=["GET"])
def get_brand_logo_config():
    config = ProviderConfig.query.order_by(ProviderConfig.id.desc()).first()
    if not config:
        return jsonify({"brand_name": "", "logo": None})
    
    logo_base64 = config.logo.hex() if config.logo else None
    return jsonify({
        "brand_name": config.brand_name,
        "logo": logo_base64
    })


@app.route("/config", methods=["POST", "PUT"])
def update_brand_logo_config():
    brand_name = request.form.get("brand_name")
    logo_file = request.files.get("logo")

    if not brand_name:
        return jsonify({"error": "Brand name is required"}), 400

    logo_binary = logo_file.read() if logo_file else None

    # Update last record or create new
    config = ProviderConfig.query.order_by(ProviderConfig.id.desc()).first()
    if config:
        config.brand_name = brand_name
        if logo_binary:
            config.logo = logo_binary
    else:
        config = ProviderConfig(brand_name=brand_name, logo=logo_binary)
        db.session.add(config)

    db.session.commit()
    return jsonify({"message": "Configuration updated successfully!"})
##########################
# ✅ Run the Server
##########################
if __name__ == "__main__":
    app.run(debug=True)
