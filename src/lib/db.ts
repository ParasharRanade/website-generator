import path from 'path'
import fs from 'fs'
import { promisify } from 'util'

const writeFile = promisify(fs.writeFile)
const readFile = promisify(fs.readFile)
const mkdir = promisify(fs.mkdir)

// Data directory for JSON storage
const dataDir = path.join(process.cwd(), 'data')
const templatesFile = path.join(dataDir, 'saved-templates.json')

export interface SavedTemplate {
  id: string
  templateId: string
  name: string
  description?: string
  thumbnail?: string
  previewUrl?: string
  downloadUrl?: string
  price?: number
  rating?: number
  downloads?: number
  tags?: string[]
  category?: string
  source?: string
  features?: string[]
  license?: string
  templateData?: string
  createdAt: string
  updatedAt: string
}

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await mkdir(dataDir, { recursive: true })
  } catch (error) {
    // Directory might already exist
  }
}

// Read saved templates from JSON file
async function readTemplates(): Promise<SavedTemplate[]> {
  try {
    await ensureDataDir()
    const data = await readFile(templatesFile, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // File doesn't exist yet, return empty array
    return []
  }
}

// Write templates to JSON file
async function writeTemplates(templates: SavedTemplate[]): Promise<boolean> {
  try {
    await ensureDataDir()
    await writeFile(templatesFile, JSON.stringify(templates, null, 2), 'utf-8')
    return true
  } catch (error) {
    console.error('Error writing templates:', error)
    return false
  }
}

// Save template to storage
export async function saveTemplate(template: Omit<SavedTemplate, 'id' | 'createdAt' | 'updatedAt'>): Promise<SavedTemplate | null> {
  try {
    const templates = await readTemplates()
    
    // Check if template already exists
    const existingIndex = templates.findIndex(t => t.templateId === template.templateId)
    
    const newTemplate: SavedTemplate = {
      ...template,
      id: existingIndex >= 0 ? templates[existingIndex].id : `tpl-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: existingIndex >= 0 ? templates[existingIndex].createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    if (existingIndex >= 0) {
      templates[existingIndex] = newTemplate
    } else {
      templates.unshift(newTemplate)
    }
    
    const success = await writeTemplates(templates)
    return success ? newTemplate : null
  } catch (error) {
    console.error('Error saving template:', error)
    return null
  }
}

// Get all saved templates
export async function getAllSavedTemplates(): Promise<SavedTemplate[]> {
  try {
    return await readTemplates()
  } catch (error) {
    console.error('Error fetching saved templates:', error)
    return []
  }
}

// Get saved template by ID
export async function getSavedTemplateById(id: string): Promise<SavedTemplate | null> {
  try {
    const templates = await readTemplates()
    return templates.find(t => t.id === id) || null
  } catch (error) {
    console.error('Error fetching saved template:', error)
    return null
  }
}

// Delete saved template
export async function deleteSavedTemplate(id: string): Promise<boolean> {
  try {
    const templates = await readTemplates()
    const filtered = templates.filter(t => t.id !== id)
    return await writeTemplates(filtered)
  } catch (error) {
    console.error('Error deleting template:', error)
    return false
  }
}

// Get templates by source
export async function getTemplatesBySource(source: string): Promise<SavedTemplate[]> {
  try {
    const templates = await readTemplates()
    return templates.filter(t => t.source === source)
  } catch (error) {
    console.error('Error fetching templates by source:', error)
    return []
  }
}

// Search saved templates
export async function searchSavedTemplates(query: string): Promise<SavedTemplate[]> {
  try {
    const templates = await readTemplates()
    const lowerQuery = query.toLowerCase()
    return templates.filter(t =>
      t.name.toLowerCase().includes(lowerQuery) ||
      t.description?.toLowerCase().includes(lowerQuery) ||
      t.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
    )
  } catch (error) {
    console.error('Error searching templates:', error)
    return []
  }
}
