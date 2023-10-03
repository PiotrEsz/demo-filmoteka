import 'js-loading-overlay';
import { loadingSpinnerConfig } from '../settings/spinner-config';
import { LoadMoreBtn } from "./load-more-btn-constructor";
import { MoviesService } from '../service/service-fetch';
import { markupMoviesGalleryBySearch } from '../templates/markup-search-movie';

// Rendering markup after on Load More Button 'click'
export const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  className: 'visually-hidden',
  isHide: true,
  callback: async e => {
    try {
      JsLoadingOverlay.show(loadingSpinnerConfig);
      MoviesService.page += 1;
      const { results, total_pages } = await MoviesService.getMoviesBySearch();

      if (MoviesService.page === total_pages || results.length === 0) {
        loadMoreBtn.hide();
      }
      
      markupMoviesGalleryBySearch(results);
      JsLoadingOverlay.hide();
    } catch (error) {
      console.log(error);
    }
  },
});