const livePreview = document.querySelector('#live-preview[data-project-id]');

if (livePreview) {
  const { projectId, sanityProject, sanityDataset } = livePreview.dataset;
  const query = new URLSearchParams({
    query: '*[_id == $id][0].showLivePreview',
    '$id': JSON.stringify(projectId),
    perspective: 'published'
  });
  const endpoint = `https://${sanityProject}.api.sanity.io/v2025-02-19/data/query/${encodeURIComponent(sanityDataset)}?${query}`;

  fetch(endpoint, { credentials: 'omit', cache: 'no-store' })
    .then((response) => {
      if (!response.ok) throw new Error(`Sanity responded with ${response.status}`);
      return response.json();
    })
    .then(({ result }) => {
      if (typeof result === 'boolean') livePreview.hidden = !result;
    })
    .catch(() => {
      // Keep the state saved into the last site build if the live query fails.
    });
}
