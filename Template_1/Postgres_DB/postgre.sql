CREATE TABLE "Provider_Info" (
  "ProviderID" uuid PRIMARY KEY,
  "ProviderFirstName" varchar,
  "ProviderMiddleInitial" varchar,
  "ProviderLastName" varchar,
  "ProviderNameSuffix" varchar,
  "ProviderType" varchar,
  "ProviderGender" varchar,
  "ProviderRaceEthnicity" varchar,
  "ProviderDOB" date,
  "ProviderAge" int,
  "ProviderNPI" varchar
);

CREATE TABLE "Provider_Address" (
  "AddressID" uuid PRIMARY KEY,
  "ProviderID" uuid,
  "ProviderAddressType" varchar,
  "ProviderAddressLine1" varchar,
  "ProviderAddressLine2" varchar,
  "ProviderAddressLine3" varchar,
  "ProviderCity" varchar,
  "ProviderState" varchar,
  "ProviderCounty" varchar,
  "ProviderCountry" varchar,
  "ProviderZIPCode" varchar,
  "ProviderLatitude" decimal,
  "ProviderLongitude" decimal
);

CREATE TABLE "Provider_Communication" (
  "CommunicationID" uuid PRIMARY KEY,
  "ProviderID" uuid,
  "ProviderContactType" varchar,
  "ProviderPhoneNo" varchar,
  "ProviderEmail" varchar
);

CREATE TABLE "Provider_Speciality" (
  "SpecialityID" uuid PRIMARY KEY,
  "ProviderID" uuid,
  "ProviderSpecialityCode" varchar,
  "ProviderSpecialityType" varchar,
  "ProviderSpecialityName" varchar,
  "ProviderSpecialityStartDate" date,
  "ProviderSpecialityEndDate" date
);

CREATE TABLE "Provider_Certification" (
  "CertificationID" uuid PRIMARY KEY,
  "ProviderID" uuid,
  "ProviderBoardCertified" varchar,
  "ProviderCertificateIssueDate" date,
  "ProviderCertificateExpiryDate" date,
  "ProviderDegree" varchar,
  "ProviderBoardName" varchar,
  "ProviderYearsOfExperience" int
);

CREATE TABLE "Provider_Location" (
  "ProviderLocationID" uuid PRIMARY KEY,
  "ProviderID" uuid,
  "ProviderAvailabilityDayOfWeek" varchar,
  "ProviderAvailabilityStartTime" time,
  "ProviderAvailabilityEndTime" time
);


CREATE TABLE "Provider_Language" (
  "LanguageRecordID" UUID PRIMARY KEY,
  "ProviderID" UUID REFERENCES "Provider_Info"("ProviderID") ON DELETE CASCADE,
  "LocationID" UUID REFERENCES "Provider_Location"("ProviderLocationID") ON DELETE CASCADE,
  "ProviderLanguageID" UUID ,
  "ProviderLanguage" VARCHAR[] ,
  "ProviderLanguageStartDate" DATE ,
  "ProviderLanguageEndDate" DATE
);


CREATE TABLE "Provider_Insurance" (
  "InsuranceRecordID" UUID PRIMARY KEY,
  "ProviderID" UUID REFERENCES "Provider_Info"("ProviderID") ON DELETE CASCADE,
  "LocationID" UUID REFERENCES "Provider_Location"("ProviderLocationID") ON DELETE CASCADE,
  "ProviderInsuranceID" UUID,
  "ProviderInsuranceName" VARCHAR,
  "ProviderPlanID" UUID,
  "ProviderPlanName" VARCHAR[],  -- Array of strings
  "ProviderNetworkType" VARCHAR,
  "ProviderPlanStartDate" DATE,
  "ProviderPlanEndDate" DATE,
  "ProviderContractStatus" VARCHAR
);

CREATE TABLE "Provider_Affiliation" (
  "AffiliationID" uuid PRIMARY KEY,
  "ProviderID" uuid,
  "ProviderAffliated" varchar,
  "ProviderAffiliationName" varchar,
  "ProviderAffiliationType" varchar,
  "ProviderAffiliationStartDate" date,
  "ProviderAffiliationEndDate" date
);

CREATE TABLE "Provider_License" (
  "LicenseRecordID" uuid PRIMARY KEY,
  "ProviderID" uuid,
  "LicenseNumber" varchar,
  "LicenseState" varchar,
  "IssueDate" date,
  "ExpiryDate" date,
  "Status" varchar
);

CREATE TABLE "Provider_VisitMode" (
  "VisitModeID" UUID PRIMARY KEY,
  "ProviderID" UUID REFERENCES "Provider_Info"("ProviderID") ON DELETE CASCADE,
  "LocationID" UUID REFERENCES "Provider_Location"("ProviderLocationID") ON DELETE CASCADE,
  "Acceptingnewpatients" VARCHAR,
  "VirtualCare" VARCHAR,
  "VisitMode" VARCHAR
);

CREATE TABLE "Provider_Ratings" (
  "RatingID" uuid PRIMARY KEY,
  "ProviderID" uuid,
  "RatingSourceID" uuid,
  "RatingSourceName" varchar,
  "RatingType" varchar,
  "RatingValue" decimal,
  "RatingStartDate" date,
  "RatingEndDate" date
);

CREATE TABLE "Provider_LeaveSchedule" (
  "LeaveID" uuid PRIMARY KEY,
  "ProviderID" uuid,
  "LocationID" uuid,
  "LeaveType" varchar,
  "LeaveStartDate" date,
  "LeaveEndDate" date,
  "LeaveReason" varchar,
  "IsRecurring" boolean,
  "RecurringPattern" varchar
);

CREATE TABLE "Provider_WorkingHours" (
  "WorkingHourID" uuid PRIMARY KEY,
  "ProviderID" uuid,
  "LocationID" uuid,
  "DayOfWeek" varchar,
  "StartTime" time,
  "EndTime" time,
  "IsActive" boolean
);

ALTER TABLE "Provider_Address" ADD FOREIGN KEY ("ProviderID") REFERENCES "Provider_Info" ("ProviderID");

ALTER TABLE "Provider_Communication" ADD FOREIGN KEY ("ProviderID") REFERENCES "Provider_Info" ("ProviderID");

ALTER TABLE "Provider_Speciality" ADD FOREIGN KEY ("ProviderID") REFERENCES "Provider_Info" ("ProviderID");

ALTER TABLE "Provider_Certification" ADD FOREIGN KEY ("ProviderID") REFERENCES "Provider_Info" ("ProviderID");

ALTER TABLE "Provider_Location" ADD FOREIGN KEY ("ProviderID") REFERENCES "Provider_Info" ("ProviderID");

ALTER TABLE "Provider_Affiliation" ADD FOREIGN KEY ("ProviderID") REFERENCES "Provider_Info" ("ProviderID");

ALTER TABLE "Provider_License" ADD FOREIGN KEY ("ProviderID") REFERENCES "Provider_Info" ("ProviderID");

ALTER TABLE "Provider_Ratings" ADD FOREIGN KEY ("ProviderID") REFERENCES "Provider_Info" ("ProviderID");

ALTER TABLE "Provider_LeaveSchedule" ADD FOREIGN KEY ("ProviderID") REFERENCES "Provider_Info" ("ProviderID");

ALTER TABLE "Provider_WorkingHours" ADD FOREIGN KEY ("ProviderID") REFERENCES "Provider_Info" ("ProviderID");
