//package com.projects.rebook.auth.oauth2;
//
//import com.projects.rebook.auth.TokenProvider;
//import com.projects.rebook.config.WebAppConfig;
////import com.projects.realestate.config.WebAppProperties;
//import com.projects.rebook.exception.BadRequestException;
//import com.projects.rebook.utils.CookieUtils;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
//import org.springframework.stereotype.Component;
//import org.springframework.web.util.UriComponentsBuilder;
//
//import javax.servlet.ServletException;
//import javax.servlet.http.Cookie;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import java.net.URI;
//import java.util.Optional;
//
//import static com.projects.rebook.auth.oauth2.HttpCookieOAuth2AuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME;
//
//@Component
//public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
//
//    private TokenProvider tokenProvider;
//
////    private WebAppProperties appProperties;
//
//    private WebAppConfig webAppConfig;
//
//    private HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;
//
//
//    @Autowired
//    OAuth2AuthenticationSuccessHandler(TokenProvider tokenProvider, WebAppConfig webAppConfig,
//                                       HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository) {
//        this.tokenProvider = tokenProvider;
//        this.webAppConfig = webAppConfig;
//        this.httpCookieOAuth2AuthorizationRequestRepository = httpCookieOAuth2AuthorizationRequestRepository;
//    }
//
//    @Override
//    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
//        String targetUrl = determineTargetUrl(request, response, authentication);
//
//        if (response.isCommitted()) {
//            logger.debug("Response has already been committed. Unable to redirect to " + targetUrl);
//            return;
//        }
//
//        clearAuthenticationAttributes(request, response);
//        getRedirectStrategy().sendRedirect(request, response, targetUrl);
//    }
//
//    private String determineTargetUrl(HttpServletRequest request, HttpServletResponse response,
//        Authentication authentication) {
//        Optional<String> redirectUri = CookieUtils.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME)
//                .map(Cookie::getValue);
//
//        if(redirectUri.isPresent() && !isAuthorizedRedirectUri(redirectUri.get())) {
//            throw new BadRequestException("Sorry! We've got an Unauthorized Redirect URI and can't proceed with the authentication");
//        }
//
//        String targetUrl = redirectUri.orElse(getDefaultTargetUrl());
//
//        String token = tokenProvider.createToken(authentication);
//
//        return UriComponentsBuilder.fromUriString(targetUrl)
//                .queryParam("token", token)
//                .build().toUriString();
//    }
//
//    private void clearAuthenticationAttributes(HttpServletRequest request,
//        HttpServletResponse response) {
//        super.clearAuthenticationAttributes(request);
//        httpCookieOAuth2AuthorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
//    }
//
//    private boolean isAuthorizedRedirectUri(String uri) {
//        URI clientRedirectUri = URI.create(uri);
//
//        String authorizedRedirectUri = WebAppConfig.authorizedRedirectUri;
//        URI authorizedURI = URI.create(authorizedRedirectUri);
//        return authorizedURI.getHost().equalsIgnoreCase(clientRedirectUri.getHost())
//            && authorizedURI.getPort() == clientRedirectUri.getPort();
//
////        return webAppConfig.getAuthorizedRedirectUris()
////                .stream()
////                .anyMatch(authorizedRedirectUri -> {
////                    // Only validate host and port. Let the clients use different paths if they want to
////                    URI authorizedURI = URI.create(authorizedRedirectUri);
////                    return authorizedURI.getHost().equalsIgnoreCase(clientRedirectUri.getHost())
////                        && authorizedURI.getPort() == clientRedirectUri.getPort();
////                });
//    }
//}