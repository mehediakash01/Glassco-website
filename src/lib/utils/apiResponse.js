// lib/utils/apiResponse.js

export class ApiResponse {
  static success(data, message = 'Success', statusCode = 200) {
    return {
      success: true,
      message,
      data,
      statusCode,
    };
  }

  static error(message = 'An error occurred', statusCode = 500, errors = null) {
    return {
      success: false,
      message,
      statusCode,
      errors,
    };
  }

  static paginated(data, page = 1, limit = 20, total = 0) {
    const totalPages = Math.ceil(total / limit);
    
    return {
      success: true,
      data,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: parseInt(total),
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }

  static validation(errors) {
    return {
      success: false,
      message: 'Validation failed',
      statusCode: 400,
      errors,
    };
  }
}