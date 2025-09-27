import { LearningPlansService } from './services/api'

// Test the topic completion functionality
async function testTopicCompletion() {
  try {
    // Mock test data - replace with actual IDs when testing with real backend
    const testLearningPlanId = '507f1f77bcf86cd799439012'
    const testTopicTitle = 'React Basics'
    
    console.log('Testing topic completion...')
    console.log(`Learning Plan ID: ${testLearningPlanId}`)
    console.log(`Topic Title: ${testTopicTitle}`)
    console.log(`Setting status to: true`)
    
    const response = await LearningPlansService.updateTopicStatus(
      testLearningPlanId, 
      testTopicTitle, 
      true
    )
    
    console.log('API Response:', response)
    console.log('✅ Topic completion test successful!')
    
    return response
  } catch (error) {
    console.error('❌ Topic completion test failed:', error)
    throw error
  }
}

// Test the phase completion functionality too
async function testPhaseCompletion() {
  try {
    const testLearningPlanId = '507f1f77bcf86cd799439012'
    const testPhaseName = 'Frontend Development'
    
    console.log('Testing phase completion...')
    console.log(`Learning Plan ID: ${testLearningPlanId}`)
    console.log(`Phase Name: ${testPhaseName}`)
    console.log(`Setting status to: true`)
    
    const response = await LearningPlansService.updatePhaseStatus(
      testLearningPlanId, 
      testPhaseName, 
      true
    )
    
    console.log('API Response:', response)
    console.log('✅ Phase completion test successful!')
    
    return response
  } catch (error) {
    console.error('❌ Phase completion test failed:', error)
    throw error
  }
}

export { testTopicCompletion, testPhaseCompletion }