package cn.alpha2j.tobesbweb.site.exception;

/**
 * Author: Jeb.Wang
 * Time: 2020/5/2 20:26
 */
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException() {
        super();
    }

    public ResourceNotFoundException(String message) {
        super(message);
    }
}
