import { ErrorBoundary } from "react-error-boundary";

function CustomErrorBoundary({ error, resetErrorBoundary }) {
    return (
        <div role="alert" className="p-4 bg-red-100 rounded">
            <p className="font-bold text-red-600">Something went wrong!</p>
            <pre className="text-sm text-red-700">Error: {error.message}</pre>
            <button
                onClick={resetErrorBoundary}
                className="px-4 py-2 mt-2 text-white bg-red-600 rounded-md" >
                Try again!
            </button>
        </div>
    );
}

export default CustomErrorBoundary;