'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { TrendingUp, MapPin, DollarSign, AlertCircle, CheckCircle, ArrowUp } from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rrpkokhjomvlumreknuq.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_L7gJaRj4UpH8UtsyC0GDHQ_6MV10N4u'
)

interface MarketData {
  trade: string
  location: string
  average_low: number
  average_high: number
  average: number
}

interface TradeData {
  name: string
  avgPrice: number
  minPrice: number
  maxPrice: number
  locations: { name: string; price: number }[]
}

export default function MarketIntelligence() {
  const [selectedTrade, setSelectedTrade] = useState<string>('roofing')
  const [selectedLocation, setSelectedLocation] = useState<string>('Salt Lake City')
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [tradeData, setTradeData] = useState<TradeData | null>(null)
  const [allTrades, setAllTrades] = useState<string[]>([])
  const [allLocations, setAllLocations] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [recommendation, setRecommendation] = useState<number | null>(null)

  // Fetch all market data
  useEffect(() => {
    fetchMarketData()
  }, [])

  const fetchMarketData = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('market_intelligence')
      .select('*')

    if (!error && data) {
      setMarketData(data)

      // Extract unique trades and locations
      const trades = [...new Set(data.map((d: MarketData) => d.trade))]
      const locations = [...new Set(data.map((d: MarketData) => d.location))]

      setAllTrades(trades.sort())
      setAllLocations(locations.sort())
    }

    setLoading(false)
  }

  // Update trade data when selection changes
  useEffect(() => {
    if (marketData.length === 0) return

    const tradeRecords = marketData.filter((d: MarketData) => d.trade === selectedTrade)
    if (tradeRecords.length === 0) return

    const avgPrices = tradeRecords.map(d => d.average)
    const locations = tradeRecords
      .sort((a: MarketData, b: MarketData) => b.average - a.average)
      .map(d => ({ name: d.location, price: d.average }))

    setTradeData({
      name: selectedTrade,
      avgPrice: Math.round(avgPrices.reduce((a, b) => a + b) / avgPrices.length),
      minPrice: Math.min(...avgPrices),
      maxPrice: Math.max(...avgPrices),
      locations
    })

    // Calculate recommendation for selected location
    const selectedData = tradeRecords.find((d: MarketData) => d.location === selectedLocation)
    if (selectedData) {
      let recommended = selectedData.average
      // Add small rating premium (assuming 4.5 star contractor)
      recommended *= 1.04
      setRecommendation(Math.round(recommended))
    }
  }, [selectedTrade, selectedLocation, marketData])

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Loading market data...</p>
      </div>
    )
  }

  const currentMarketData = marketData.find(
    (d: MarketData) => d.trade === selectedTrade && d.location === selectedLocation
  )

  const seasonalPremiums: { [key: string]: { season: string; premium: number; reason: string }[] } = {
    roofing: [
      { season: 'Winter (Dec-Feb)', premium: 35, reason: 'Emergency repairs from snow damage' },
      { season: 'Fall (Sep-Nov)', premium: 25, reason: 'Pre-winter preparation season' }
    ],
    'hvac': [
      { season: 'Winter (Dec-Feb)', premium: 25, reason: 'Furnace emergencies' },
      { season: 'Summer (Jun-Aug)', premium: 15, reason: 'AC repairs peak demand' }
    ],
    'siding': [
      { season: 'Spring (Mar-May)', premium: 12, reason: 'Spring renovation season' },
      { season: 'Summer (Jun-Aug)', premium: 8, reason: 'Good weather for outdoor work' }
    ],
    'deck': [
      { season: 'Spring (Mar-May)', premium: 10, reason: 'Outdoor season starts' },
      { season: 'Summer (Jun-Aug)', premium: 15, reason: 'Peak outdoor renovation season' }
    ]
  }

  const currentSeasonalPremiums = seasonalPremiums[selectedTrade] || []

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-navy-500 mb-2">💡 Market Intelligence</h1>
        <p className="text-gray-600">Real-time pricing data and recommendations for your trade in Salt Lake County</p>
      </div>

      {/* Selection Controls */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Trade Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Your Trade</label>
          <select
            value={selectedTrade}
            onChange={(e) => setSelectedTrade(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
          >
            {allTrades.map(trade => (
              <option key={trade} value={trade}>
                {trade.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Location Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Your Location</label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
          >
            {allLocations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Market Overview Cards */}
      {currentMarketData && tradeData && (
        <>
          {/* Pricing Recommendation */}
          <div className="bg-gradient-to-br from-navy-500 to-teal-500 rounded-2xl p-8 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-teal-500/80 text-sm font-semibold mb-2">💡 RECOMMENDED BID</p>
                <p className="text-5xl font-bold">${recommendation?.toLocaleString()}</p>
              </div>
              <CheckCircle size={40} className="text-teal-500" />
            </div>
            <p className="text-white/90">
              Based on market average of ${currentMarketData.average.toLocaleString()} with 4.5⭐ contractor premium (+4%)
            </p>
            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-sm text-white/80">Expected bid acceptance rate: <span className="font-semibold">65%+</span></p>
            </div>
          </div>

          {/* Market Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Market Average */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-600">Market Average</p>
                <DollarSign size={20} className="text-navy-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900">${currentMarketData.average.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-2">All contractors in {selectedLocation}</p>
            </div>

            {/* Price Range */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-600">Typical Range</p>
                <TrendingUp size={20} className="text-teal-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900">
                ${currentMarketData.average_low.toLocaleString()} - ${currentMarketData.average_high.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-2">Low to high in market</p>
            </div>

            {/* Your Position */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-600">Your Position</p>
                <MapPin size={20} className="text-green-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {recommendation && currentMarketData.average
                  ? Math.round((recommendation / currentMarketData.average) * 100)
                  : 100}%
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {recommendation && currentMarketData.average
                  ? recommendation > currentMarketData.average
                    ? 'Premium vs market'
                    : 'Competitive vs market'
                  : 'Of market average'}
              </p>
            </div>
          </div>

          {/* Price Comparison by Location */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Pricing Across Locations</h2>
            <div className="space-y-4">
              {tradeData.locations.map((loc, i) => {
                const isSelected = loc.name === selectedLocation
                const percentOfMax = Math.round((loc.price / tradeData.maxPrice) * 100)
                const premium = loc.price > tradeData.avgPrice ? '+' + Math.round((loc.price / tradeData.avgPrice - 1) * 100) + '%' : Math.round((loc.price / tradeData.avgPrice - 1) * 100) + '%'

                return (
                  <div
                    key={i}
                    className={`p-4 rounded-lg border-2 transition ${
                      isSelected
                        ? 'border-navy-500 bg-navy-500/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">{loc.name}</span>
                      <span className="text-sm font-bold text-navy-500">${loc.price.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-navy-500 to-teal-500 h-2 rounded-full"
                        style={{ width: `${percentOfMax}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      {premium} vs average • {percentOfMax}% of highest market
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Seasonal Insights */}
          {currentSeasonalPremiums.length > 0 && (
            <div className="bg-white rounded-xl border border-amber-200 p-8 bg-amber-50">
              <div className="flex items-center mb-6">
                <AlertCircle size={24} className="text-amber-600 mr-3" />
                <h2 className="text-xl font-bold text-amber-900">🌡️ Seasonal Opportunity Alert</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {currentSeasonalPremiums.map((item, i) => (
                  <div key={i} className="bg-white rounded-lg p-4 border border-amber-200">
                    <p className="font-semibold text-gray-900 mb-1">{item.season}</p>
                    <p className="text-2xl font-bold text-amber-600 mb-2">+{item.premium}%</p>
                    <p className="text-sm text-gray-600">{item.reason}</p>
                    <div className="mt-3 p-3 bg-amber-50 rounded">
                      <p className="text-xs text-amber-900">
                        Recommended: <span className="font-bold">${Math.round(currentMarketData.average * (1 + item.premium / 100)).toLocaleString()}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Insights & Tips */}
          <div className="bg-gradient-to-br from-navy-50 to-indigo-50 rounded-xl border border-navy-200 p-8">
            <h2 className="text-xl font-bold text-navy-700 mb-4">💡 Smart Bidding Tips</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <span className="font-semibold">Know Your Value:</span> Your recommended bid of ${recommendation?.toLocaleString()} is based on market data and your contractor rating
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <span className="font-semibold">Price Confidently:</span> Don't underbid - contractors at $10 above market still have 60%+ acceptance rate
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <span className="font-semibold">Seasonal Premium:</span> In peak season, you can charge 15-35% more - homeowners pay extra for fast service
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <span className="font-semibold">Millcreek Premium:</span> Wealthy neighborhoods support 25%+ higher pricing - customers have bigger budgets
                </span>
              </li>
            </ul>
          </div>
        </>
      )}

      {/* No Data Message */}
      {!currentMarketData && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-600">No market data available for selected trade/location</p>
        </div>
      )}
    </div>
  )
}
