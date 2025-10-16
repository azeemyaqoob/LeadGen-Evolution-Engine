"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowLeft, Download, Palette, Sparkles, Zap } from "lucide-react"

interface RedesignData {
  html: string
  css: string
  businessName: string
  improvements: string[]
  designNotes: string[]
}

export default function RedesignPreview() {
  const params = useParams()
  const [redesignData, setRedesignData] = useState<RedesignData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real implementation, this would fetch the actual redesign data
    // For demo purposes, we'll show a sample redesign
    const mockRedesign: RedesignData = {
      businessName: "Sample Business",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Professional Business Website Redesign</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #333; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
                .header { background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); box-shadow: 0 4px 20px rgba(0,0,0,0.1); padding: 1rem 0; position: fixed; width: 100%; top: 0; z-index: 1000; }
                .nav { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 0 2rem; }
                .logo { font-size: 1.5rem; font-weight: bold; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 8rem 2rem 4rem; text-align: center; color: white; }
                .hero h1 { font-size: 3.5rem; margin-bottom: 1rem; font-weight: 700; }
                .hero p { font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.9; }
                .btn { display: inline-block; padding: 12px 32px; background: white; color: #667eea; text-decoration: none; border-radius: 50px; font-weight: 600; transition: all 0.3s ease; }
                .btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,0.2); }
                .section { padding: 5rem 2rem; max-width: 1200px; margin: 0 auto; }
                .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
                .card { background: white; padding: 2.5rem; border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.1); transition: all 0.3s ease; }
                .card:hover { transform: translateY(-5px); box-shadow: 0 20px 50px rgba(0,0,0,0.15); }
                .footer { background: #1a202c; color: white; text-align: center; padding: 3rem 2rem; }
                @media (max-width: 768px) {
                    .hero h1 { font-size: 2.5rem; }
                    .nav { flex-direction: column; gap: 1rem; }
                }
            </style>
        </head>
        <body>
            <header class="header">
                <nav class="nav">
                    <div class="logo">Your Business</div>
                    <div>
                        <a href="#about" style="margin-right: 2rem; text-decoration: none; color: #333; font-weight: 500;">About</a>
                        <a href="#services" style="margin-right: 2rem; text-decoration: none; color: #333; font-weight: 500;">Services</a>
                        <a href="#contact" class="btn" style="background: linear-gradient(135deg, #667eea, #764ba2); color: white;">Contact</a>
                    </div>
                </nav>
            </header>
            
            <section class="hero">
                <h1>Transform Your Digital Presence</h1>
                <p>Modern, responsive design that converts visitors into customers</p>
                <a href="#contact" class="btn">Start Your Journey</a>
            </section>
            
            <section class="section">
                <h2 style="text-align: center; margin-bottom: 3rem; font-size: 2.5rem; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Why Choose Us</h2>
                <div class="grid">
                    <div class="card">
                        <h3 style="color: #667eea; margin-bottom: 1rem; font-size: 1.5rem;">Modern Design</h3>
                        <p>Cutting-edge design that reflects your brand's excellence and professionalism.</p>
                    </div>
                    <div class="card">
                        <h3 style="color: #667eea; margin-bottom: 1rem; font-size: 1.5rem;">Mobile First</h3>
                        <p>Perfect experience on all devices, from desktop to mobile smartphones.</p>
                    </div>
                    <div class="card">
                        <h3 style="color: #667eea; margin-bottom: 1rem; font-size: 1.5rem;">Fast & Secure</h3>
                        <p>Lightning-fast loading times with enterprise-grade security features.</p>
                    </div>
                </div>
            </section>
            
            <footer class="footer">
                <p>&copy; 2024 Your Business. All rights reserved.</p>
            </footer>
        </body>
        </html>
      `,
      css: "",
      improvements: [
        "Modern gradient design with purple theme",
        "Mobile-first responsive layout",
        "Interactive hover animations",
        "Professional color scheme",
        "Optimized for conversion",
      ],
      designNotes: [
        "Applied modern gradient backgrounds",
        "Used purple as primary brand color",
        "Implemented smooth animations",
        "Added professional card layouts",
      ],
    }

    setTimeout(() => {
      setRedesignData(mockRedesign)
      setLoading(false)
    }, 1500)
  }, [params.filename])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600"></div>
            <Sparkles className="h-6 w-6 text-purple-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="mt-4 text-lg font-semibold text-gray-700">Generating your redesign...</p>
          <p className="text-sm text-gray-500 mt-2">Creating a beautiful, modern website template</p>
        </div>
      </div>
    )
  }

  if (!redesignData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100">
        <div className="text-center">
          <Zap className="h-16 w-16 text-rose-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Redesign Not Found</h1>
          <p className="text-gray-600">The requested redesign could not be loaded.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
      {/* Preview Controls */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Website Redesign Preview
            </h1>
            <p className="text-sm text-purple-100">Business: {redesignData.businessName}</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => window.history.back()} 
              className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-200 flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Results
            </button>
            <button 
              onClick={() => window.print()} 
              className="px-4 py-2 bg-white text-purple-600 rounded-xl hover:bg-gray-100 transition-all duration-200 flex items-center gap-2 font-semibold"
            >
              <Download className="h-4 w-4" />
              Save Design
            </button>
          </div>
        </div>
      </div>

      {/* Redesign Preview */}
      <div className="bg-white shadow-2xl mx-4 my-6 rounded-2xl overflow-hidden">
        <iframe 
          srcDoc={redesignData.html} 
          className="w-full h-[80vh] border-0" 
          title="Website Redesign Preview" 
        />
      </div>

      {/* Improvements Summary */}
      <div className="bg-white/80 backdrop-blur-sm mx-4 mb-6 rounded-2xl shadow-lg border border-gray-200">
        <div className="max-w-6xl mx-auto p-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-600" />
            Redesign Improvements
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4 text-gray-800 flex items-center gap-2">
                <Zap className="h-4 w-4 text-green-500" />
                Key Improvements
              </h3>
              <ul className="space-y-3">
                {redesignData.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4 text-gray-800 flex items-center gap-2">
                <Palette className="h-4 w-4 text-blue-500" />
                Design Notes
              </h3>
              <ul className="space-y-3">
                {redesignData.designNotes.map((note, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}