package com.agrocare.agrocare.service.admin;

import com.agrocare.agrocare.helper.Constants;
import com.agrocare.agrocare.model.Users;
import com.agrocare.agrocare.pojo.AdminDashboardResponse;
import com.agrocare.agrocare.pojo.AdminUserResponse;
import com.agrocare.agrocare.pojo.CreateAdminRequest;
import com.agrocare.agrocare.pojo.CustomResponse;
import com.agrocare.agrocare.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class AdminService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private FarmRepository farmRepository;

	@Autowired
	private CropRepository cropRepository;

	@Autowired
	private PestRepository pestRepository;

	@Autowired
	private InventoryRepository inventoryRepository;

	@Autowired
	private IrrigationRepository irrigationRepository;

	@Autowired
	private AlertRepository alertRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public CustomResponse getDashboard() {
		List<Users> users = userRepository.findAll();
		long farmerCount = users.stream().filter(this::isFarmer).count();
		long adminCount = users.stream().filter(this::isAdmin).count();
		long unreadAlertCount = 0;
		for (Users user : users) {
			unreadAlertCount += alertRepository.countByUserAndIsRead(user, false);
		}

		AdminDashboardResponse response = new AdminDashboardResponse(
				users.size(),
				farmerCount,
				adminCount,
				farmRepository.count(),
				cropRepository.count(),
				pestRepository.count(),
				inventoryRepository.count(),
				irrigationRepository.count(),
				alertRepository.count(),
				unreadAlertCount
		);

		return new CustomResponse(response);
	}

	public CustomResponse getUsers() {
		List<AdminUserResponse> users = userRepository.findAll().stream()
				.filter(this::isFarmer)
				.map(user -> new AdminUserResponse(
						user.getId(),
						user.getName(),
						user.getEmail(),
						getRole(user),
						user.getStatus(),
						user.getPreferredLanguage(),
						user.getCreatedAt(),
						user.getUpdatedAt(),
						farmRepository.countByUser(user),
						toLong(cropRepository.countByUser(user)),
						toLong(pestRepository.countByUser(user)),
						toLong(inventoryRepository.countByUser(user)),
						irrigationRepository.countByUser(user),
						alertRepository.countByUser(user)
				))
				.toList();

		return new CustomResponse(users);
	}

	public CustomResponse getAdmins() {
		List<AdminUserResponse> users = userRepository.findAll().stream()
				.filter(this::isAdmin)
				.map(user -> new AdminUserResponse(
						user.getId(),
						user.getName(),
						user.getEmail(),
						getRole(user),
						user.getStatus(),
						user.getPreferredLanguage(),
						user.getCreatedAt(),
						user.getUpdatedAt(),
						0L,
						0L,
						0L,
						0L,
						0L,
						0L
				))
				.toList();

		return new CustomResponse(users);
	}

	private boolean isAdmin(Users user) {
		return Constants.Authorities.ADMIN.equals(user.getAuthorityString());
	}

	private boolean isFarmer(Users user) {
		return Constants.Authorities.USER.equals(user.getAuthorityString());
	}

	private String getRole(Users user) {
		return user.getAuthorityString() == null ? Constants.Authorities.USER : user.getAuthorityString();
	}

	private long toLong(Object value) {
		return value instanceof Number ? ((Number) value).longValue() : 0L;
	}

	/**
	 * Create a new admin user
	 * @param request CreateAdminRequest with name, email, password
	 * @return CustomResponse with created user
	 */
	public CustomResponse createAdmin(CreateAdminRequest request) {
		try {
			// Check if email already exists
			if (userRepository.findByEmail(request.getEmail()).isPresent()) {
				return new CustomResponse(false, "Email already exists");
			}

			// Create new admin user
			Users admin = new Users();
			admin.setName(request.getName());
			admin.setEmail(request.getEmail());
			admin.setPassword(passwordEncoder.encode(request.getPassword()));
			admin.setAuthorities(Constants.Authorities.ADMIN);
			admin.setStatus(Constants.Status.ACTIVE);
			admin.setEnabled(true);
			admin.setAccountNonExpired(true);
			admin.setAccountNonLocked(true);
			admin.setCredentialsNonExpired(true);
			admin.setPreferredLanguage(request.getPreferredLanguage() != null ? request.getPreferredLanguage() : "en");

			Users created = userRepository.save(admin);
			log.info("✓ Admin user created: {}", created.getEmail());

			AdminUserResponse response = new AdminUserResponse(
					created.getId(),
					created.getName(),
					created.getEmail(),
					getRole(created),
					created.getStatus(),
					created.getPreferredLanguage(),
					created.getCreatedAt(),
					created.getUpdatedAt(),
					0, 0, 0, 0, 0, 0
			);

			return new CustomResponse(true, response, "Admin user created successfully");
		} catch (Exception e) {
			log.error("Error creating admin user", e);
			return new CustomResponse(false, "Error creating admin user: " + e.getMessage());
		}
	}
}
