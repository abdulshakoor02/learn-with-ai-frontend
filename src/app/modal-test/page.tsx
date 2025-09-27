'use client'

import { useState } from 'react'
import { LearningModal } from '@/components/courses/LearningModal'

export default function ModalTestPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [content, setContent] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const mockModule = {
    id: 'test-1',
    title: 'Introduction to Machine Learning Algorithms',
    duration: '45 min',
    type: 'video' as const,
    completed: false,
    locked: false
  }

  const handleTestModal = (testCase: string) => {
    setIsModalOpen(true)
    setError(null)
    setContent(null)
    
    switch (testCase) {
      case 'loading':
        setIsLoading(true)
        setTimeout(() => {
          setIsLoading(false)
          setContent(`# Introduction to Machine Learning Algorithms

## Overview
Machine Learning (ML) is a subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed. This comprehensive guide will walk you through the fundamental concepts, algorithms, and practical applications.

## Key Concepts

### 1. What is Machine Learning?
Machine Learning is about creating algorithms that can learn patterns from data and make predictions or decisions based on that learning.

### 2. Types of Machine Learning
- **Supervised Learning**: Learning with labeled examples
- **Unsupervised Learning**: Finding patterns in unlabeled data  
- **Reinforcement Learning**: Learning through interaction and rewards

### 3. Common Algorithms
- Linear Regression
- Decision Trees
- Random Forest
- Support Vector Machines
- Neural Networks
- K-Means Clustering

## Practical Examples

### Example 1: Email Spam Detection
Using supervised learning to classify emails as spam or not spam based on features like:
- Sender reputation
- Subject line keywords
- Email content analysis
- Attachment types

### Example 2: Customer Segmentation
Using unsupervised learning to group customers based on:
- Purchase history
- Demographics
- Behavior patterns
- Preferences

## Best Practices
1. Always start with data exploration
2. Clean and preprocess your data
3. Choose appropriate algorithms for your problem
4. Validate your models properly
5. Monitor performance in production

## Common Pitfalls
- Overfitting to training data
- Using insufficient or biased data
- Not validating assumptions
- Ignoring feature engineering

## Next Steps
After completing this lesson, you should:
- Understand the basic types of ML algorithms
- Be able to identify which algorithm to use for different problems
- Have hands-on experience with data preprocessing
- Know how to evaluate model performance

## Summary
Machine Learning is a powerful tool that requires understanding of both theory and practice. Start with simple algorithms and gradually work your way up to more complex models as you gain experience.`)
        }, 2000)
        break
        
      case 'error':
        setIsLoading(true)
        setTimeout(() => {
          setIsLoading(false)
          setError('Failed to generate learning content. Please check your internet connection and try again.')
        }, 1500)
        break
        
      case 'empty':
        setIsLoading(false)
        break
        
      default:
        setIsLoading(false)
        setContent('This is a test content to verify the modal layout.')
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setContent(null)
    setIsLoading(false)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Modal Layout Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => handleTestModal('content')}
            className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Test with Content
          </button>
          
          <button
            onClick={() => handleTestModal('loading')}
            className="p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Test Loading State
          </button>
          
          <button
            onClick={() => handleTestModal('error')}
            className="p-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Test Error State
          </button>
          
          <button
            onClick={() => handleTestModal('empty')}
            className="p-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Test Empty State
          </button>
        </div>

        <div className="mt-8 p-6 bg-white/10 rounded-xl border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-4">Test Instructions:</h2>
          <ul className="text-white/80 space-y-2">
            <li>• Click any button above to test different modal states</li>
            <li>• Check if the footer is visible and not cut off</li>
            <li>• Test on different screen sizes</li>
            <li>• Verify content scrolling works properly</li>
            <li>• Make sure close button and escape key work</li>
          </ul>
        </div>

        <LearningModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          module={mockModule}
          content={content}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  )
}