import React, { createContext, useContext, useState, useEffect } from 'react'
import Papa from 'papaparse'

const DataContext = createContext({})

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

export const DataProvider = ({ children }) => {
  const [trainsets, setTrainsets] = useState([])
  const [fitnessData, setFitnessData] = useState([])
  const [jobCards, setJobCards] = useState([])
  const [brandingData, setBrandingData] = useState([])
  const [mileageData, setMileageData] = useState([])
  const [cleaningSlots, setCleaningSlots] = useState([])
  const [stablingData, setStablingData] = useState([])
  const [loading, setLoading] = useState(true)

  // Sample data - in production, this would come from APIs
  const sampleData = {
    fitness: `Trainset ID,Certificate Type,Validity Start,Validity Expiry,Status
KM-01,Signalling,2025-10-01,2026-10-01,Valid
KM-02,Rolling-Stock,2024-03-17,2025-03-17,Expired
KM-03,Rolling-Stock,2025-11-02,2026-11-02,Valid
KM-04,Rolling-Stock,2024-01-15,2025-01-14,Expired
KM-05,Telecom,2025-10-10,2026-10-10,Valid
KM-06,Signalling,2025-08-25,2026-08-25,Valid
KM-07,Signalling,2025-04-14,2026-04-14,Valid
KM-08,Telecom,2025-04-26,2026-04-26,Valid
KM-09,Signalling,2024-06-23,2025-06-23,Pending
KM-10,Rolling-Stock,2025-02-03,2026-02-03,Valid
KM-11,Telecom,2025-06-01,2026-06-01,Valid
KM-12,Signalling,2024-08-20,2025-08-20,Expired
KM-13,Rolling-Stock,2025-09-08,2026-09-08,Valid
KM-14,Telecom,2024-10-12,2025-10-12,Valid
KM-15,Signalling,2025-07-01,2026-07-01,Valid
KM-16,Rolling-Stock,2024-09-13,2025-09-13,Valid
KM-17,Telecom,2024-07-27,2025-07-27,Expired
KM-18,Telecom,2024-12-17,2025-12-17,Valid
KM-19,Telecom,2025-06-07,2026-06-07,Valid
KM-20,Signalling,2024-01-31,2025-01-30,Pending`,

    jobCards: `Work Order ID,Trainset ID,Maintenance Type,Status,Priority,Expected Completion
WO-1000,KM-01,Corrective,Closed,Medium,2025-07-22
WO-1001,KM-14,Preventive,In-progress,Low,2025-05-14
WO-1002,KM-18,Preventive,In-progress,Low,2025-04-25
WO-1003,KM-12,Corrective,Closed,Low,2025-08-16
WO-1004,KM-08,Corrective,Closed,High,2025-04-14
WO-1005,KM-16,Emergency,Open,High,2025-11-14
WO-1006,KM-05,Emergency,In-progress,Low,2025-05-18
WO-1007,KM-11,Corrective,Closed,Medium,2025-06-08
WO-1008,KM-19,Emergency,In-progress,Low,2025-09-04
WO-1009,KM-17,Preventive,In-progress,High,2025-07-23
WO-1010,KM-02,Corrective,Open,Low,2025-03-07
WO-1011,KM-12,Corrective,Closed,High,2025-07-02
WO-1012,KM-06,Emergency,Open,Medium,2025-11-14
WO-1013,KM-14,Preventive,Closed,Low,2025-09-14
WO-1014,KM-16,Preventive,In-progress,Medium,2025-12-19
WO-1015,KM-03,Corrective,Open,Low,2025-11-25
WO-1016,KM-07,Preventive,Open,Low,2025-01-23
WO-1017,KM-09,Corrective,Open,Medium,2025-10-24
WO-1018,KM-11,Corrective,In-progress,Low,2025-12-27
WO-1019,KM-18,Emergency,Open,High,2025-09-08`,

    branding: `Trainset ID,Branding Type,Contract ID,Exposure Hours Required,Hours Completed,Remaining Hours
KM-01,Partial Wrap,BR-2025-01,985,932,53
KM-02,Partial Wrap,BR-2025-02,1065,747,318
KM-03,Full Wrap,BR-2025-03,747,531,216
KM-04,None,-,0,0,0
KM-05,None,-,0,0,0
KM-06,Full Wrap,BR-2025-06,613,357,256
KM-07,Interior Ads,BR-2025-07,537,149,388
KM-08,None,-,0,0,0
KM-09,Full Wrap,BR-2025-09,1344,1229,115
KM-10,None,-,0,0,0
KM-11,None,-,0,0,0
KM-12,Interior Ads,BR-2025-12,966,488,478
KM-13,Full Wrap,BR-2025-13,894,536,358
KM-14,Full Wrap,BR-2025-14,1353,601,752
KM-15,Full Wrap,BR-2025-15,1132,514,618
KM-16,Full Wrap,BR-2025-16,782,103,679
KM-17,Partial Wrap,BR-2025-17,454,453,1
KM-18,Partial Wrap,BR-2025-18,546,147,399
KM-19,None,-,0,0,0
KM-20,Interior Ads,BR-2025-20,1197,599,598`,

    mileage: `Trainset ID,Total KM Run,KM Since Bogie Change,KM Since Brake-Pad Change,KM Since HVAC Service,Avg Daily KM
KM-01,93511,26894,8931,6821,226
KM-02,130371,10552,9800,4757,267
KM-03,96558,11317,5432,4373,205
KM-04,115778,7829,10809,4831,286
KM-05,127126,21693,14982,6915,285
KM-06,139246,7460,3977,3130,273
KM-07,102401,22673,7259,9533,288
KM-08,100351,18163,8419,7452,255
KM-09,112303,8345,9775,9123,299
KM-10,118999,26179,3376,5308,216
KM-11,109325,10793,13932,2901,284
KM-12,145078,13983,6791,8629,287
KM-13,119128,15985,10155,5336,304
KM-14,113100,17824,14317,3757,237
KM-15,127315,22896,8338,7082,201
KM-16,101786,12157,5149,2660,271
KM-17,144834,28326,8895,4088,201
KM-18,128233,21329,6032,3693,226
KM-19,97962,5197,4717,6241,213
KM-20,84672,17709,6508,6620,319`,

    cleaning: `Bay ID,Availability Window,Cleaning Type,Manpower Assigned,Occupancy (Trainset),Next Free Slot
Bay-01,22:00–02:00,Light,2,KM-05,2025-09-18
Bay-02,23:00–01:00,Light,4,KM-13,2025-09-13
Bay-03,22:00–01:00,Light,3,KM-04,2025-09-19
Bay-04,00:00–03:00,Deep,4,KM-11,2025-09-13
Bay-05,21:00–23:00,Light,5,KM-06,2025-09-14
Bay-06,20:00–23:00,Light,5,KM-13,2025-09-15
Bay-07,22:00–00:00,Light,3,KM-11,2025-09-13
Bay-08,21:00–00:00,Deep,2,KM-02,2025-09-17
Bay-09,00:00–04:00,Light,3,KM-13,2025-09-15
Bay-10,20:00–00:00,Deep,5,KM-06,2025-09-16
Bay-11,00:00–03:00,Deep,3,KM-13,2025-09-20
Bay-12,23:00–01:00,Light,5,KM-17,2025-09-11
Bay-13,21:00–23:00,Light,6,KM-16,2025-09-19
Bay-14,20:00–23:00,Light,6,KM-07,2025-09-11
Bay-15,22:00–01:00,Light,5,KM-01,2025-09-19
Bay-16,22:00–02:00,Light,6,KM-01,2025-09-17
Bay-17,21:00–00:00,Deep,4,-,2025-09-14
Bay-18,20:00–00:00,Light,2,KM-14,2025-09-19
Bay-19,22:00–01:00,Light,4,KM-19,2025-09-19
Bay-20,00:00–02:00,Light,5,KM-12,2025-09-18`,

    stabling: `Bay ID,Location,Max Train Length,Assigned Trainset,Shunting Moves Required,Morning Priority Score
Bay-01,Inner Bay,4 cars,KM-16,0,9.0
Bay-02,Inner Row,4 cars,KM-07,3,8.4
Bay-03,Inner Row,4 cars,KM-18,2,6.5
Bay-04,Mid Row,4 cars,KM-13,0,8.1
Bay-05,Near Exit,4 cars,KM-06,3,8.5
Bay-06,Mid Row,4 cars,KM-03,2,7.6
Bay-07,Near Entry,4 cars,-,3,8.6
Bay-08,Inner Bay,4 cars,-,2,7.7
Bay-09,Inner Row,4 cars,KM-17,1,8.7
Bay-10,Near Exit,4 cars,KM-09,1,9.9
Bay-11,Near Exit,4 cars,KM-13,2,6.0
Bay-12,Inner Row,4 cars,KM-11,3,6.2
Bay-13,Inner Row,4 cars,KM-04,1,7.4
Bay-14,Mid Row,4 cars,KM-11,3,8.5
Bay-15,Mid Row,4 cars,KM-17,0,8.8
Bay-16,Inner Bay,4 cars,KM-10,0,8.8
Bay-17,Near Exit,4 cars,KM-05,2,9.4
Bay-18,Inner Bay,4 cars,KM-09,3,9.1
Bay-19,Inner Row,4 cars,KM-19,0,8.4
Bay-20,Mid Row,4 cars,KM-08,2,6.4`
  }

  // Parse CSV data
  const parseCSV = (csvString) => {
    return new Promise((resolve) => {
      Papa.parse(csvString, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: (results) => resolve(results.data)
      })
    })
  }

  // Load and process data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [fitness, jobs, branding, mileage, cleaning, stabling] = await Promise.all([
          parseCSV(sampleData.fitness),
          parseCSV(sampleData.jobCards),
          parseCSV(sampleData.branding),
          parseCSV(sampleData.mileage),
          parseCSV(sampleData.cleaning),
          parseCSV(sampleData.stabling)
        ])

        setFitnessData(fitness)
        setJobCards(jobs)
        setBrandingData(branding)
        setMileageData(mileage)
        setCleaningSlots(cleaning)
        setStablingData(stabling)

        // Create consolidated trainset data
        const trainsetIds = Array.from(new Set(fitness.map(item => item['Trainset ID'])))
        const consolidatedTrainsets = trainsetIds.map(id => {
          const fitnessItem = fitness.find(item => item['Trainset ID'] === id)
          const brandingItem = branding.find(item => item['Trainset ID'] === id)
          const mileageItem = mileage.find(item => item['Trainset ID'] === id)
          const openJobCards = jobs.filter(job => job['Trainset ID'] === id && job.Status === 'Open')

          return {
            id,
            status: fitnessItem?.Status || 'Unknown',
            certificateType: fitnessItem?.['Certificate Type'] || 'N/A',
            validityExpiry: fitnessItem?.['Validity Expiry'] || 'N/A',
            brandingType: brandingItem?.['Branding Type'] || 'None',
            remainingHours: brandingItem?.['Remaining Hours'] || 0,
            totalKM: mileageItem?.['Total KM Run'] || 0,
            avgDailyKM: mileageItem?.['Avg Daily KM'] || 0,
            openJobCards: openJobCards.length,
            fitnessScore: calculateFitnessScore(fitnessItem, openJobCards),
            lastUpdate: new Date().toISOString()
          }
        })

        setTrainsets(consolidatedTrainsets)
        setLoading(false)
      } catch (error) {
        console.error('Error loading data:', error)
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Calculate fitness score based on certificate status and job cards
  const calculateFitnessScore = (fitnessItem, jobCards) => {
    let score = 100
    
    if (!fitnessItem) return 0
    
    // Deduct points for expired/pending certificates
    if (fitnessItem.Status === 'Expired') score -= 50
    if (fitnessItem.Status === 'Pending') score -= 20
    
    // Deduct points for open job cards
    jobCards.forEach(job => {
      if (job.Priority === 'High') score -= 15
      if (job.Priority === 'Medium') score -= 10
      if (job.Priority === 'Low') score -= 5
    })
    
    return Math.max(0, score)
  }

  // Get trainset by ID
  const getTrainsetById = (id) => {
    return trainsets.find(trainset => trainset.id === id)
  }

  // Get fitness data for trainset
  const getFitnessForTrainset = (id) => {
    return fitnessData.find(item => item['Trainset ID'] === id)
  }

  // Get job cards for trainset
  const getJobCardsForTrainset = (id) => {
    return jobCards.filter(job => job['Trainset ID'] === id)
  }

  // Get branding data for trainset
  const getBrandingForTrainset = (id) => {
    return brandingData.find(item => item['Trainset ID'] === id)
  }

  const value = {
    trainsets,
    fitnessData,
    jobCards,
    brandingData,
    mileageData,
    cleaningSlots,
    stablingData,
    loading,
    getTrainsetById,
    getFitnessForTrainset,
    getJobCardsForTrainset,
    getBrandingForTrainset
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}