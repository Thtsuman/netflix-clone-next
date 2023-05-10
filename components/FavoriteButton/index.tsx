import React, { useCallback, useMemo } from "react";
import axios from "axios";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

import useFavorites from "@/hooks/useFavorites";
import useCurrentUser from "@/hooks/useCurrentUser";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { user: currentUser, mutate: currentUserMutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;

    if (isFavorite) {
      response = await axios.delete(`/api/favorite?movieId=${movieId}`);
    } else {
      response = await axios.post("/api/favorite", { movieId });
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;

    currentUserMutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    });

    mutateFavorites();
  }, [movieId, isFavorite, currentUser, currentUserMutate, mutateFavorites]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      className="
            cursor-pointer
            group/item
            w-6
            h-6
            lg:w-10 lg:h-10
            border-white
            border-2
            rounded-full
            flex
            justify-center
            items-center
            transition
            hover:border-netural-300
        "
      onClick={toggleFavorites}
    >
      <Icon size={25} className="text-white" />
    </div>
  );
};

export default FavoriteButton;
