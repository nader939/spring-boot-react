package com.ets.sample.web;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * Handles uncaught exceptions in other {@code RestController}s
 * 
 * @author n.salaheldeen
 *
 */
@ControllerAdvice
public class ControllerExceptionHandler {

	Logger logger = LoggerFactory.getLogger(ControllerExceptionHandler.class);

	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<String> handleException(HttpServletRequest request, Exception ex) {

		logger.error("Exception Ocurred", ex);
		return new ResponseEntity<String>("System Error", HttpStatus.INTERNAL_SERVER_ERROR);

	}

}
