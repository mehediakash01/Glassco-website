export class ApiResponse {
  static success(data, message = 'Success', statusCode = 200) {
    return {
      status: 'success',
      statusCode,
      message,
      data
    };
  }

  static error(message = 'Error', statusCode = 500, errors = null) {
    return {
      status: 'error',
      statusCode,
      message,
      ...(errors && { errors })
    };
  }

  static paginated(data, page, limit, total) {
    return {
      status: 'success',
      data,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }
}