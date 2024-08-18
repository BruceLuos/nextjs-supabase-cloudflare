import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * pricing section 弹窗
 * @showPricingModal 是否显示pricing section弹窗
 * @setShowPricingModal 设置是否显示pricing section弹窗
 * @pricingModalStatus pricing section弹窗标题状态 "normal" | "private" | "download"
 */
interface PricingModalStore {
  showPricingModal: boolean;
  setShowPricingModal: (value: boolean) => void;
  pricingModalStatus: "normal" | "private" | "download";
  setPricingModalStatus: (value: "normal" | "private" | "download") => void;
}

/** pricing section 弹窗 */
export const usePricingModalStore = create<PricingModalStore>()((set) => ({
  showPricingModal: false,
  setShowPricingModal: (value: boolean) =>
    set(() => ({ showPricingModal: value })),
  pricingModalStatus: "normal",
  setPricingModalStatus: (value: "normal" | "private" | "download") =>
    set(() => ({ pricingModalStatus: value })),
}));
