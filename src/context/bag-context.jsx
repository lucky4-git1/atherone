/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react"
import { PRODUCT_DATA } from "@/data/product-data"
import { soundEngine } from "@/lib/audio-synthesizer"

const BagContext = createContext(null)

export function BagProvider({ children }) {
  // Global selected finish and edition
  const [selectedFinish, setSelectedFinish] = useState(PRODUCT_DATA.finishes[0])
  const [selectedEdition, setSelectedEdition] = useState(PRODUCT_DATA.editions[0])

  // Bag items state with localStorage persistence
  const [items, setItems] = useState(() => {
    if (typeof window === "undefined") return []
    try {
      const stored = localStorage.getItem("aether_one_bag")
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  // Drawer & Checkout UI States
  const [isBagOpen, setIsBagOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("aether_one_bag", JSON.stringify(items))
    } catch {
      // storage unavailable
    }
  }, [items])

  const setFinishById = (finishId) => {
    const found = PRODUCT_DATA.finishes.find((f) => f.id === finishId)
    if (found) {
      soundEngine.playClick()
      setSelectedFinish(found)
    }
  }

  const setEditionById = (editionId) => {
    const found = PRODUCT_DATA.editions.find((e) => e.id === editionId)
    if (found) {
      soundEngine.playClick()
      setSelectedEdition(found)
    }
  }

  const addToBag = (finish = selectedFinish, edition = selectedEdition, quantity = 1) => {
    soundEngine.playChime()
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.finishId === finish.id && item.editionId === edition.id
      )
      if (existingIndex > -1) {
        const next = [...prev]
        next[existingIndex].quantity += quantity
        return next
      }
      return [
        ...prev,
        {
          finishId: finish.id,
          finishName: finish.name,
          finishHex: finish.hex,
          editionId: edition.id,
          editionName: edition.name,
          price: edition.price,
          quantity,
        },
      ]
    })
    setIsBagOpen(true)
  }

  const updateQuantity = (index, delta) => {
    soundEngine.playClick()
    setItems((prev) => {
      const next = [...prev]
      const updatedQty = next[index].quantity + delta
      if (updatedQty <= 0) {
        next.splice(index, 1)
      } else {
        next[index].quantity = updatedQty
      }
      return next
    })
  }

  const removeItem = (index) => {
    soundEngine.playClick()
    setItems((prev) => prev.filter((_, i) => i !== index))
  }

  const clearBag = () => {
    setItems([])
  }

  const totalItemCount = items.reduce((acc, item) => acc + item.quantity, 0)
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <BagContext.Provider
      value={{
        selectedFinish,
        setFinishById,
        selectedEdition,
        setEditionById,
        items,
        addToBag,
        updateQuantity,
        removeItem,
        clearBag,
        totalItemCount,
        subtotal,
        isBagOpen,
        setIsBagOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
      }}
    >
      {children}
    </BagContext.Provider>
  )
}

export function useBag() {
  const context = useContext(BagContext)
  if (!context) {
    throw new Error("useBag must be used within a BagProvider")
  }
  return context
}
