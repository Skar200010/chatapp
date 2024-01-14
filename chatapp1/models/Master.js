const mongoose = require('mongoose')
const Schema = mongoose.Schema


const masterSchema = new Schema ({

  id: Number,
  serviceid: String,
  servicecode: String,
  servicename: String,
  dated: String,
  limsid: Number,
  LimsIdServiceId: String,
  IsActive: Boolean,
  CreatedDate: String,
  ModifiedDate: String,
  IsAgeBasedRestriction: Boolean,
  IsAppRegistrationAllow: Boolean,
  IsB2BSpecificService: Boolean,
  IsCancellationCharges: Boolean,
  IsConsentFormAvailable: Boolean,
  IsHomeVisitNotApplicable: Boolean,
  IsPackage: Boolean,
  IsPopularPackage: Boolean,
  IsShowInDOS: Boolean,
  ServiceType: String,
  ServiceImage: String,
  ServiceDiscountCategoryId: Number,
  TATTotalMinutes: Number,
  ValidUpTo: String,
  OrderingInfo: String,
  PatientPreparation: String,
  Reported: String,
  ClinicalReference: String,
  ServiceClassification: String,
  Methodology: String,
  ApplicableGender: String,
  Collect: String,
  SpecimenPreparation: String,
  SpecimenVolume: String,
  StorageTemperature: String,
  Notes: String,
  Limitation: String,
  BranchIdList: String,
  ServiceImage1: String,
  ServiceImage2: String,
  ApplicableAgeFrom: Number,
  ApplicableAgeTo: Number,
  MaxDiscountAmountAllow: Number,
  ServiceDescription: String,

})

module.exports = mongoose.model('Master' , masterSchema)