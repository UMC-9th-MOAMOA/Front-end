import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ItemCategory, ShopItem } from "@/types/home/shop";
import { useEquipItem } from "../../hooks/useEquipItem";
import { usePurchaseItem } from "../../hooks/usePurchaseItem";
import { useShopItems } from "../../hooks/useQuery/useShopItems";
import type { ItemStatus } from "../../types/types";
import InsufficientAcornsModal from "../modal/InsufficientAcornsModal";
import PurchaseCompleteModal from "../modal/PurchaseCompleteModal";
import PurchaseConfirmModal from "../modal/PurchaseConfirmModal";
import ItemCard from "./ItemCard";

type ModalType = "confirm" | "complete" | "insufficient" | null;

interface ShopItemsGridProps {
  category: ItemCategory;
  isBackground: boolean;
}

const ShopItemsGrid = ({ category, isBackground }: ShopItemsGridProps) => {
  const navigate = useNavigate();
  const { data } = useShopItems(category);
  const purchaseMutation = usePurchaseItem();
  const equipMutation = useEquipItem();
  const [purchaseTarget, setPurchaseTarget] = useState<ShopItem | null>(null);
  const [modalType, setModalType] = useState<ModalType>(null);

  const getItemStatus = (item: ShopItem): ItemStatus => {
    if (!item.owned) return "locked";
    if (item.equipped) return "selected";
    return "owned";
  };

  const handleItemSelect = (item: ShopItem) => {
    if (!item.owned) {
      setPurchaseTarget(item);
      setModalType("confirm");
      return;
    }

    if (equipMutation.isPending) return;
    equipMutation.mutate(item.itemId);
  };

  const handleConfirmPurchase = () => {
    if (!purchaseTarget || purchaseMutation.isPending) return;

    if (purchaseTarget.affordable) {
      purchaseMutation.mutate(purchaseTarget.itemId, {
        onSuccess: () => {
          setModalType("complete");
        },
      });
    } else {
      setModalType("insufficient");
    }
  };

  const closeModal = () => {
    setModalType(null);
    setPurchaseTarget(null);
  };

  const shortfall = purchaseTarget
    ? purchaseTarget.price - data.walletPoint
    : 0;

  return (
    <>
      <div className="flex flex-wrap gap-16">
        {data.items.map((item) => (
          <ItemCard
            key={item.itemId}
            item={item}
            isBackground={isBackground}
            status={getItemStatus(item)}
            onSelect={() => handleItemSelect(item)}
          />
        ))}
      </div>

      <PurchaseConfirmModal
        isOpen={modalType === "confirm"}
        onClose={closeModal}
        onConfirm={handleConfirmPurchase}
        price={purchaseTarget?.price ?? 0}
      />

      <PurchaseCompleteModal
        isOpen={modalType === "complete"}
        onClose={closeModal}
        onApply={() => {
          if (!purchaseTarget || equipMutation.isPending) return;
          equipMutation.mutate(purchaseTarget.itemId, {
            onSuccess: () => closeModal(),
          });
        }}
        isLoading={equipMutation.isPending}
        name={purchaseTarget?.name ?? ""}
      />

      <InsufficientAcornsModal
        isOpen={modalType === "insufficient"}
        onClose={closeModal}
        onGoToMission={() => navigate("/search")}
        shortfall={shortfall}
      />
    </>
  );
};

export default ShopItemsGrid;
