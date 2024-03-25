/**
 * A function reportWebVitals takes an argument called onPerfEntry 
 * 
 * - It checks if onPerfEntry is defined and is a function.
 * - If it is, it imports the 'web-vitals' module and then calls the onCLS, onFID, onFCP, onLCP, and onTTFB functions from the imported module, passing the onPerfEntry function as an argument to each of them.
 * 
 * @param {Function} onPerfEntry - The function to be called for each performance entry.
 * @returns {void}
 */
function reportWebVitals(onPerfEntry)
{
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
      onCLS(onPerfEntry);
      onFID(onPerfEntry);
      onFCP(onPerfEntry);
      onLCP(onPerfEntry);
      onTTFB(onPerfEntry);
    });
  }
}

export default 
/**
 * @function
 * @typedef {Object} reportWebVitals
 * @property {Function} reportWebVitals - The function reportWebVitals takes an argument called onPerfEntry.
 */
reportWebVitals;
